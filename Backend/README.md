# 🏥 Medical Appointment Management System

Welcome to the **Medical Appointment Management System**! This project is a backend application designed to streamline interactions between administrators, doctors, and users in a medical context. Below is a breakdown of each component and how they work together to create a robust and maintainable backend.

## 🗂️ Project Structure

```plaintext
📦Backend
 ┣ 📂config
 ┃ ┣ 📜cloudinary.js
 ┃ ┗ 📜mongodb.js
 ┣ 📂controllers
 ┃ ┣ 📜adminController.js
 ┃ ┣ 📜doctorController.js
 ┃ ┗ 📜userController.js
 ┣ 📂middlewares
 ┃ ┣ 📜authAdmin.js
 ┃ ┣ 📜authDoctor.js
 ┃ ┣ 📜authUser.js
 ┃ ┗ 📜multer.js
 ┣ 📂models
 ┃ ┣ 📜appointmentModel.js
 ┃ ┣ 📜doctorModel.js
 ┃ ┗ 📜userModel.js
 ┣ 📂routes
 ┃ ┣ 📜adminRoute.js
 ┃ ┣ 📜doctorRoute.js
 ┃ ┗ 📜userRoute.js
 ┣ 📜.env
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜server.js
 ┗ 📜vercel.json
```

---

## 📖 Overview of Key Components

### 1. **Config**
   - `cloudinary.js`: Manages configurations for Cloudinary, a cloud-based image and video management service, to handle file uploads.
   - `mongodb.js`: Establishes and manages the connection to MongoDB, the database used to store user, doctor, and appointment data.

### 2. **Controllers**
   - `adminController.js`, `doctorController.js`, `userController.js`: These files contain the main business logic for handling various actions like creating appointments, managing users, and doctor-specific functionalities. Each controller organizes operations specific to each role, making the code more maintainable and modular.

### 3. **Middlewares**
   - `authAdmin.js`, `authDoctor.js`, `authUser.js`: These files provide role-based authentication, ensuring that only authorized users (e.g., admins, doctors) can access specific endpoints.
   - `multer.js`: Configures Multer to handle file uploads, especially for handling user profile pictures, documents, or any file that needs to be uploaded.

### 4. **Models**
   - `appointmentModel.js`, `doctorModel.js`, `userModel.js`: Define Mongoose schemas for appointments, doctors, and users, respectively. These schemas represent data structure and relationships, allowing the application to interact with MongoDB in a structured way.

### 5. **Routes**
   - `adminRoute.js`, `doctorRoute.js`, `userRoute.js`: Map HTTP requests to controller functions for each user type (admin, doctor, user). By organizing routes in this way, each role has clearly defined endpoints, making it easy to expand or modify.

### 6. **Root Files**
   - `.env`: Stores environment variables securely (e.g., database URLs, API keys) without exposing them in code.
   - `package.json` & `package-lock.json`: Manage project dependencies, making it easy to install, update, and share the project setup.
   - `server.js`: The main entry point that initializes the Express server, connects configurations, routes, and middleware, and starts the application.
   - `vercel.json`: Configures deployment settings for Vercel, defining the environment for seamless deployment and scaling.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. Download it [here](https://nodejs.org/).
- **MongoDB**: Ensure you have a MongoDB instance running or sign up for a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
- **Cloudinary**: Set up a Cloudinary account to handle image uploads. You’ll need your API key and secret.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MedicalAppointmentSystem.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

### API Endpoints

| Method | Endpoint           | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `/admin/...`        | Admin-specific actions         |
| GET    | `/doctor/...`       | Doctor-specific actions        |
| GET    | `/user/...`         | User-specific actions          |
| POST   | `/upload`           | Handles file uploads           |

For detailed information on endpoints, please refer to the documentation (add link if available).

---

## 📂 Deployment

This project is preconfigured for deployment on Vercel. Simply link this repository to your Vercel project, and it will automatically deploy based on the `vercel.json` configuration.

---

## 🌐 Connect

For questions or collaboration, please contact us at sachinmhetre678@gmail.com.

---
