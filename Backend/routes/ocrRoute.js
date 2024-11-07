// backend/routes/ocrRoute.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';  
import { fileURLToPath } from 'url';  // Import fileURLToPath from 'url'
import { ocrImage, chatWithGemini } from '../controllers/ocrController.js';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Now you can use __dirname

const router = express.Router();

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use the absolute path to the uploads directory
    const uploadPath = path.join(__dirname, '../uploads');
    
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });  // Create the directory if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);  // Keeps the original file name
  }
});

const upload = multer({ storage: storage });

// OCR Route
router.post('/ocr', upload.single('image'), (req, res) => {
  console.log('Uploaded file:', req.file); // Log the uploaded file info for debugging
  ocrImage(req, res);  // Call the controller function to process the image
});

router.post('/chat', (req, res) => {
  console.log('Received message for chat:', req.body.message);
  chatWithGemini(req, res);  // Call the controller function to handle chat
});

export default router;
