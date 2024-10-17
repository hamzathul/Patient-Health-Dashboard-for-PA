import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // State to hold the list of patients and the search query
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
     const fetchPatients = async () => {
       try {
         const response = await axios.get("/patient/all");
         console.log(response)
         setPatients(response.data);
       } catch (error) {
         console.error("Error fetching patient data:", error);
       }
     };

     fetchPatients();
   }, []);

   // Filter the patients based on the search query
   const filteredPatients = patients.filter(
     (patient) =>
       patient.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    //  ||  patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
   );

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Patient Dashboard
        </h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search by patient name or condition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Patient List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Age</th>
                <th className="py-3 px-6 text-left">Condition</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient._id} className="border-b">
                    <td className="py-3 px-6">{patient.name}</td>
                    <td className="py-3 px-6">{patient.age}</td>
                    <td className="py-3 px-6">{patient.condition}</td>
                    <td className="py-3 px-6">
                      <Link
                        to={`/patient/${patient._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard