import { AuthorizationRequest } from "../models/authorizationRequest.model.js";

export const createAuthorization = async(req, res)=>{
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
        const newRequest = new AuthorizationRequest({
          patientId,
          treatmentType,
          insurancePlan,
          dateOfService,
          diagnosisCode,
          doctorNotes,
          authStatus,
        });
        await newRequest.save()
        res.status(201).json({success:true, message:"Saved Successfully"})
    } catch (error) {
        console.error("Error in createAuthorization controller:", error)
        res.status(400).json({ success: false, message: error.message });
    }
}

// export const getAuthorization = async(req, res)=>{
//     const patientId = req.params.id;
//     try {
//         const patientAuthorization = await AuthorizationRequest.findById
//     } catch (error) {
        
//     }
// }