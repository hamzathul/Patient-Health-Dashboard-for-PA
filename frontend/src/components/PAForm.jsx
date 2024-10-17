import React from 'react'

const PAForm = () => {
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
              name="treatment"
              value={formData.treatment}
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
            ></textarea>
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