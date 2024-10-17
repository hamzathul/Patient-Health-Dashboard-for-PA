import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true); 

        const response = await axios.get("/patient/all");
        const patientData = response.data;

        // Fetch authorization status for each patient
        const patientsWithStatus = await Promise.all(
          patientData.map(async (patient) => {
            try {
              const authResponse = await axios.get(
                `/authorization/${patient._id}`
              );
              const authStatus =
                authResponse.data.length > 0
                  ? authResponse.data[0].authStatus
                  : "Pending"; // Default to "Pending" if no data is found
              return { ...patient, authStatus }; // Combine patient data with authorization status
            } catch (error) {
              console.error(
                `Error fetching auth status for patient ${patient._id}`,
                error
              );
              return { ...patient, authStatus: "Pending" }; // Default to "Pending" if API call fails
            }
          })
        );

        setPatients(patientsWithStatus);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false); 
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
        Patient Health Dashboard
      </h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          className="w-1/2 p-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          placeholder="Search by patient name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="py-4 px-6 text-left text-lg">Name</th>
                <th className="py-4 px-6 text-left text-lg">Age</th>
                <th className="py-4 px-6 text-left text-lg">Condition</th>
                <th className="py-4 px-6 text-left text-lg">Status</th>
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
                    <td className="py-3 px-6 text-gray-300">
                      {patient.authStatus || "Pending"}
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
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
