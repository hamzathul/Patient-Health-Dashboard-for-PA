import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PAForm from "../components/PAForm";

const PatientDetails = () => {
  const { id } = useParams(); // Get patient ID from the URL
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch patient details when the component loads
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`/patient/${id}`);
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

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

      {/* Patient Information */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Patient Information
        </h2>
        <p className="text-gray-300">
          <strong>Name:</strong> {patient.name}
        </p>
        <p className="text-gray-300">
          <strong>Age:</strong> {patient.age}
        </p>
        <p className="text-gray-300">
          <strong>Condition:</strong> {patient.condition}
        </p>
        <div className="mb-4">
          <strong className="text-white">Medical History:</strong>
          <ul className="list-disc list-inside text-gray-300">
            {patient.medicalHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
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
