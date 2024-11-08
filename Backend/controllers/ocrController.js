import fs from "fs";
import path from "path";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { promisify } from "util";
import { GoogleGenerativeAI } from "@google/generative-ai";
import doctorModel from "../models/doctorModel.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const key = process.env.VISION_KEY;
const endpoint = process.env.VISION_ENDPOINT;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log(
  "Initializing Azure Computer Vision Client with provided credentials..."
);
const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

let conversationHistory = {};

export const chatWithGemini = async (req, res) => {
  try {
    const userId = req.body.userId;
    const message = req.body.message;

    if (!userId || !message) {
      return res
        .status(400)
        .json({ error: "User ID and message are required" });
    }

    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    conversationHistory[userId].push({ role: "user", content: message });

    const doctors = await doctorModel
      .find({})
      .select(["name", "specialty", "available"]);

      const doctorList = doctors.map((doc) => ({
        name: doc.name,
        specialty: doc.specialty,
        available: doc.available ? "Yes" : "No",
      }));

    const prompt = conversationHistory[userId]
      .map((entry) => `${entry.role}: ${entry.content}`)
      .join("\n");

    const structuredPrompt = `
      You are a medical assistant with the ability to provide detailed responses to health-related inquiries, such as symptoms, conditions, and treatment options. Additionally, you have access to an organizational doctor list that you can reference to suggest the most suitable doctor based on the user's needs. Use this list to provide recommendations when the user requests a doctor for a specific condition or specialty.

      When user logs in first time always greet and mention what can you do for them.

      Doctor List:
      ${JSON.stringify(doctorList, null, 2)}

      Guidance for response:
      - Answer the user’s question in clear, plain text. Exclude any unnecessary details or symbols (such as * or \) and retain only essential, user-friendly information.
      - Provide a direct answer to the user’s question in plain text.
      - If the user requests a doctor, suggest the best match (always suggest only single doctor unless asked) from the doctor list based on the specialty or symptoms mentioned by the user. Ensure exact matching of the specialty (case-insensitive).      - If the user’s question lacks details, ask for clarification politely.
      
      Previous conversation:
      ${prompt}

      Respond in a clean, plain-text format with no unnecessary symbols, but feel free to use emojis if they help with clarity or tone.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(structuredPrompt);
    const responseText = await result.response.text();

    const cleanedText = responseText.replace(/```json|```/g, "").trim();

    if (!cleanedText || cleanedText === "") {
      return res
        .status(500)
        .json({ error: "Gemini response is empty or invalid" });
    }

    conversationHistory[userId].push({ role: "gemini", content: cleanedText });

    res.json({ response: cleanedText });
  } catch (err) {
    console.error("Error handling chat:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function sendToGemini(userId, text, doctors) {
  if (!conversationHistory[userId]) {
    conversationHistory[userId] = [];
  }

  const prompt = `
  You are a medical assistant tasked with extracting and structuring key medical information from a given text in JSON format. Use the provided doctor list to suggest the most suitable doctor based on the prescription details. The JSON object should contain:

  {
    "formattedText": "Summarize the text in clean, plain language. Exclude any unnecessary details or symbols (such as * or \\) and retain only essential, user-friendly information.",
    "disease": "Name and description of the diagnosed disease, if available or suggest based on your knowledge if possible",
    "medications": [
      {
        "name": "Medication name",
        "dosage": "Dosage details",
        "instructions": "Usage instructions"
      },
      ...
    ],
    "alternativeMedications": [
      "List suggested alternative medications if relevant",
      ...
    ],
    "followUpActions": [
      "List recommended follow-up actions here",
      ...
    ],
    "warnings": [
      "Include relevant warnings about drug interactions or contraindications",
      ...
    ],
    "sideEffectsSummary": "Summary of possible side effects",
  }

  Additional Instructions:
  - If the input lacks valid prescription or medical information, respond with: { "error": "Invalid details provided" }.
  - For any missing fields, use general medical knowledge to fill in as appropriate.
  
  Text to analyze:
  ${text}
  
  Only return the structured JSON object with no additional text.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const responseText = await result.response.text();

  const cleanedText = responseText
    .replace(/```json|```/g, "")
    .replace(/\n\s*\n/g, "\n")
    .trim();

  try {
    const parsedResponse = JSON.parse(cleanedText);

    conversationHistory[userId].push({
      role: "user",
      content: text,
    });

    conversationHistory[userId].push({
      role: "gemini",
      content: parsedResponse,
    });

    return parsedResponse;
  } catch (error) {
    console.error("Error parsing Gemini response as JSON:", error);
    return { error: "Failed to parse Gemini response" };
  }
}

const processImageForOCR = async (filePath) => {
  console.log(`Processing image for OCR: ${filePath}`);
  const stream = fs.createReadStream(filePath);
  let result = await computerVisionClient.readInStream(() => stream);
  let operation = result.operationLocation.split("/").slice(-1)[0];
  console.log(`Started OCR operation, operation ID: ${operation}`);

  let status = result.status;
  while (status !== "succeeded" && status !== "failed") {
    console.log(`Waiting for OCR operation to complete... Status: ${status}`);
    await promisify(setTimeout)(1000);
    result = await computerVisionClient.getReadResult(operation);
    status = result.status;
  }

  if (status === "succeeded") {
    console.log("OCR operation completed successfully.");
    return result.analyzeResult.readResults;
  } else {
    console.error("OCR operation failed.");
    throw new Error("OCR operation failed");
  }
};

const formatRecognizedText = (readResults) => {
  console.log("Formatting recognized text...");
  const recognizedText = [];
  for (const page of readResults) {
    page.lines.forEach((line) => {
      recognizedText.push(line.words.map((word) => word.text).join(" "));
    });
  }
  console.log("Formatted recognized text.");
  return recognizedText.join("\n");
};

export const ocrImage = async (req, res) => {
  console.log("Received image for OCR:", req.file);
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
    const normalizedFilePath = path.normalize(filePath).replace(/^\\/, "");

    if (!fs.existsSync(normalizedFilePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const ocrResult = await processImageForOCR(normalizedFilePath);
    const recognizedText = formatRecognizedText(ocrResult);
    const doctors = await doctorModel
      .find({})
      .select(["name", "speciality", "available"]);

    const geminiData = await sendToGemini(userId, recognizedText, doctors);

    if (geminiData.error) {
      console.error("Error with Gemini data:", geminiData.error);
      return res.status(500).json(geminiData.error);
    }

    res.json({
      recognizedText,
      geminiData: geminiData,
    });
  } catch (err) {
    console.error("Error during OCR or Gemini analysis:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
