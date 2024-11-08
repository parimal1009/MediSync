import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import WaitingList from "./pages/WaitingListPage"; // Import the WaitingList page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/waiting-list" element={<WaitingList />} />
      </Routes>
      <Footer />
    </div>
  );
}
