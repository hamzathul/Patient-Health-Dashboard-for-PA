import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/patient/all");
        console.log(response);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Patient Dashboard
      </h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          className="w-1/2 p-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          placeholder="Search by patient name or condition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Patient List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="py-4 px-6 text-left text-lg">Name</th>
              <th className="py-4 px-6 text-left text-lg">Age</th>
              <th className="py-4 px-6 text-left text-lg">Condition</th>
              <th className="py-4 px-6 text-left text-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="hover:bg-gray-700 transition duration-200"
                >
                  <td className="py-3 px-6 text-gray-300">{patient.name}</td>
                  <td className="py-3 px-6 text-gray-300">{patient.age}</td>
                  <td className="py-3 px-6 text-gray-300">
                    {patient.condition}
                  </td>
                  <td className="py-3 px-6">
                    <Link
                      to={`/patient/${patient._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
