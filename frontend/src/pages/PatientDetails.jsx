import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import PAForm from "../components/PAForm";

const PatientDetails = () => {
  const { id } = useParams(); // Get patient ID from the URL
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicalHistory, setFilteredMedicalHistory] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch patient details when the component loads
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`/patient/${id}`);
        setPatient(response.data);
        setFilteredMedicalHistory(response.data.medicalHistory); // Initialize filtered medical history
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  // Filter medical history based on search term
  useEffect(() => {
    if (patient) {
      const results = patient.medicalHistory.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedicalHistory(results);
    }
  }, [searchTerm, patient]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="loader border-8 border-t-8 border-gray-300 border-t-white rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        {patient.name}'s Details
      </h1>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back
      </button>

      {/* Search Input for Medical History */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search medical history..."
          className="w-full p-3 bg-slate-500 focus:bg-slate-300 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient Information */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Patient Information
        </h2>
        <p className="text-gray-300">
          <strong>Name:</strong> {patient.name}
        </p>
        <p className="text-gray-300 mt-1">
          <strong>Age:</strong> {patient.age}
        </p>
        <p className="text-gray-300 mt-1">
          <strong>Condition:</strong> {patient.condition}
        </p>
        <div className="mb-4 mt-2">
          <strong className="text-white">Medical History:</strong>
          {filteredMedicalHistory.length > 0 ? (
            <ul className="list-disc list-inside text-gray-300 mt-1">
              {filteredMedicalHistory.map((item, index) => (
                <li className="mt-2" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No matching records found.</p>
          )}
        </div>
        <p className="text-gray-300">
          <strong>Treatment Plan:</strong> {patient.treatmentPlan}
        </p>
      </div>

      {/* Prior Authorization Form */}
      <PAForm />
    </div>
  );
};

export default PatientDetails;
