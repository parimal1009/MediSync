//server.js
import express from "express";
const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port (default to 3000)

// Define a simple route that responds with "Hello"
app.get("/", (req, res) => {
  res.send("Hello from the backend!"); // Send a response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
