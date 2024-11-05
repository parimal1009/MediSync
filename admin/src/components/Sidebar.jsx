import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const navLinkClass = (isActive) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
    }`;

  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink
            className={({ isActive }) => navLinkClass(isActive)}
            to='/admin-dashboard'
          >
            <img src={assets.home_icon} alt='Dashboard Icon' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) => navLinkClass(isActive)}
            to='/all-appointments'
          >
            <img src={assets.appointment_icon} alt='Appointments Icon' />
            <p className='hidden md:block'>All Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) => navLinkClass(isActive)}
            to='/add-doctor'
          >
            <img src={assets.add_icon} alt='Add Doctor Icon' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) => navLinkClass(isActive)}
            to='/doctor-list'
          >
            <img src={assets.people_icon} alt='Doctors List Icon' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink
            className={({ isActive }) => navLinkClass(isActive)}
            to='/doctor-dashboard'
          >
            <img src={assets.home_icon} alt='Dashboard Icon' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) => navLinkClass(isActive)}
            to='/doctor-appointments'
          >
            <img src={assets.appointment_icon} alt='Appointments Icon' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) => navLinkClass(isActive)}
            to='/doctor-profile'
          >
            <img src={assets.people_icon} alt='Profile Icon' />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
