import { AuthorizationRequest } from "../models/authorizationRequest.model.js";

export const createAuthorization = async (req, res) => {
  const {
    patientId,
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
    doctorNotes,
    authStatus,
  } = req.body;

  try {
    // Check if an authorization request already exists for the patient
    const existingRequest = await AuthorizationRequest.findOne({ patientId });

    if (existingRequest) {
      // If it exists, update the existing record
      const updatedRequest = await AuthorizationRequest.findByIdAndUpdate(
        existingRequest._id,
        {
          treatmentType,
          insurancePlan,
          dateOfService,
          diagnosisCode,
          doctorNotes,
          authStatus,
        },
        { new: true } // Return the updated document
      );

      return res
        .status(200)
        .json({
          success: true,
          message: "Updated Successfully",
          data: updatedRequest,
        });
    } else {
      // If it doesn't exist, create a new record
      const newRequest = new AuthorizationRequest({
        patientId,
        treatmentType,
        insurancePlan,
        dateOfService,
        diagnosisCode,
        doctorNotes,
        authStatus,
      });

      await newRequest.save();
      return res
        .status(201)
        .json({
          success: true,
          message: "Created Successfully",
          data: newRequest,
        });
    }
  } catch (error) {
    console.error("Error in createAuthorization controller:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAuthorization = async(req, res)=>{
    const patientId = req.params.id;
    try {
         const authorization = await AuthorizationRequest.find({ patientId });
        if (!authorization || authorization.length === 0) {
          return res
            .status(200)
            .json([]);
        }
        res.status(200).json(authorization)
    } catch (error) {
        console.error("Error in getAuthorization controller:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
}