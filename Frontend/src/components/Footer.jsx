import React from "react";
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* ---------- Left Section ---------- */}
        <div>
          <div className="flex items-center">
            <img className="mb-5 w-20" src={assets.logo} alt="Company Logo" />
            <p className="ml-2 text-lg font-semibold">MediSync</p>
          </div>  


          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* ---------- Center Section ---------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About us</a></li>
            <li><a href="/contact" className="hover:underline">Contact us</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy policy</a></li>
          </ul>
        </div>

        {/* ---------- Right Section ---------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Phone number</li>
            <li>Email</li>
          </ul>
        </div>

      </div>

      {/* ---------- Copyright Text ---------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright © 2024 - All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
