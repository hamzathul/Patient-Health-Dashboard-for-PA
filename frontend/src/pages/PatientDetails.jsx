import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PAForm from '../components/PAForm';

const PatientDetails = () => {
      const { id } = useParams(); // Get patient ID from the URL
      const [patient, setPatient] = useState(null);
      const [loading, setLoading] = useState(true);
      const [formData, setFormData] = useState({
        treatment: "",
        insurancePlan: "",
        dateOfService: "",
        diagnosisCode: "",
        doctorNotes: "",
      });

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

      // Handle form input changes
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          await axios.post("/api/authorizations", {
            ...formData,
            patientId: id,
          });
          alert("Authorization request submitted successfully.");
        } catch (error) {
          console.error("Error submitting authorization request:", error);
        }
      };

      if (loading) {
        return <p>Loading patient details...</p>;
      }

  return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {patient.name}'s Details
        </h1>

        {/* Patient Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Condition:</strong> {patient.condition}
          </p>
          <p>
            <strong>Medical History:</strong> {patient.medicalHistory}
          </p>
          <p>
            <strong>Treatment Plan:</strong> {patient.treatmentPlan}
          </p>
        </div>

        {/* Prior Authorization Form */}
        <PAForm/>
      </div>
  );
}

export default PatientDetails