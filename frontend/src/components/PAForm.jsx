import React, { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PAForm = () => {
  const { id } = useParams(); // Get patient ID from the URL

  const [formData, setFormData] = useState({
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    doctorNotes: "",
    authStatus:""
  });

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
      await axios.post("/authorization", {
        ...formData,
        patientId: id,
      });
      alert("Authorization request submitted successfully.");
    } catch (error) {
      console.error("Error submitting authorization request:", error);
    }
  };
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Submit Prior Authorization
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Treatment Type</label>
            <input
              type="text"
              name="treatmentType"
              value={formData.treatmentType}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Insurance Plan</label>
            <input
              type="text"
              name="insurancePlan"
              value={formData.insurancePlan}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Date of Service</label>
            <input
              type="date"
              name="dateOfService"
              value={formData.dateOfService}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Diagnosis Code</label>
            <input
              type="text"
              name="diagnosisCode"
              value={formData.diagnosisCode}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Doctor's Notes</label>
            <textarea
              name="doctorNotes"
              value={formData.doctorNotes}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Authorization Status
            </label>
            <select
              name="authStatus"
              value={formData.authStatus}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit Authorization
          </button>
        </form>
      </div>
    </>
  );
}

export default PAForm