import { Patient } from "../models/patient.model.js";

export const getAllPatients = async(req, res)=>{
    try {
        const patients = await Patient.find()
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error in getAllPatients controller:", error)
        res.status(400).json({success:false, message: error.message})
    }
}

export const getPatientById = async(req, res)=>{
    const patientId = req.params.id
    try {
        const patient = await Patient.findById(patientId)
        if(!patient){
            return res.status(400).json({success:false, message:"patient not found"})
        }
        res.status(200).json(patient)
    } catch (error) {
        console.error("error in getPatientById controller:", error)
        res.status(400).json({ success: false, message: error.message });
    }
}