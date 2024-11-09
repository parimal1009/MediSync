import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import './WaitingListPage.css'

const WaitingList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Add error state to handle errors
  const { backendUrl, token } = useContext(AppContext);

  useEffect(() => {
    // Fetch waiting list data from backend
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/user/appointments", 
          { headers: { token } }) // Adjust the URL if needed
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          setAppointments([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Error fetching appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [appointments]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log("appointments=>>",appointments);
  return (
    <div className="waiting-list-container">
      <h2 className="list-heading">Patient Waiting List</h2>
      
       <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Patient Name</th>
              <th className="py-2 px-4 border-b">Doctor</th>
              <th className="py-2 px-4 border-b">Appointment Time</th>
              <th className="py-2 px-4 border-b">Appointment Id.</th>
            </tr>
          </thead>
          {appointments.length > 0 ? <tbody>
            {appointments?.map((appointment) => (<tr key={appointment._id}>
                <td className="py-2 px-4 border-b">{appointment?.userData?.name}</td>
                <td className="py-2 px-4 border-b">{appointment?.docData
                ?.name}</td>
                <td className="py-2 px-4 border-b">{appointment?.slotTime}</td>
                <td className="py-2 px-4 border-b">{appointment?._id}</td>
              </tr>
            ))}
          </tbody> : <div>No Appointments founds !</div>}
        </table>
    </div>
  );
};

export default WaitingList;
