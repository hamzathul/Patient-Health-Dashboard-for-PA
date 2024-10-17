import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const PAForm = () => {
  const { id } = useParams(); // Get patient ID from the URL

  const [formData, setFormData] = useState({
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    doctorNotes: "",
    authStatus: "",
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
      toast.success("Authorization request submitted successfully.");
    } catch (error) {
      console.error("Error submitting authorization request:", error);
    }
  };

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Submit Prior Authorization
      </h2>
      <form onSubmit={handleSubmit} className="md:px-28">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">
            Treatment Type
          </label>
          <input
            type="text"
            name="treatmentType"
            value={formData.treatmentType}
            onChange={handleChange}
            className="w-full p-3 bg-slate-500 focus:bg-slate-300 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">
            Insurance Plan
          </label>
          <input
            type="text"
            name="insurancePlan"
            value={formData.insurancePlan}
            onChange={handleChange}
            className="w-full p-3  bg-slate-500 focus:bg-slate-300 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">
            Date of Service
          </label>
          <input
            type="date"
            name="dateOfService"
            value={formData.dateOfService}
            onChange={handleChange}
            className="w-full p-3  bg-slate-500 focus:bg-slate-300 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">
            Diagnosis Code
          </label>
          <input
            type="text"
            name="diagnosisCode"
            value={formData.diagnosisCode}
            onChange={handleChange}
            className="w-full p-3 bg-slate-500 focus:bg-slate-300 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">
            Doctor's Notes
          </label>
          <textarea
            name="doctorNotes"
            value={formData.doctorNotes}
            onChange={handleChange}
            className="w-full p-3  bg-slate-500 focus:bg-slate-300 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Authorization Status
          </label>
          <select
            name="authStatus"
            value={formData.authStatus}
            onChange={handleChange}
            className="block appearance-none w-full bg-gray-700 border border-gray-300 text-gray-300 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
  );
};

export default PAForm;
