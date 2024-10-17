import mongoose from "mongoose";
import { Patient } from "./models/patient.model.js";
import dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

// Dummy patient data
const patients = [
  {
    name: "John Doe",
    age: 45,
    medicalHistory: ["Diabetes", "Hypertension"],
    condition: "Chronic Illness",
    treatmentPlan: "Insulin and blood pressure medications",
  },
  {
    name: "Jane Smith",
    age: 30,
    medicalHistory: ["Asthma"],
    condition: "Chronic Illness",
    treatmentPlan: "Inhaler and allergy medication",
  },
  {
    name: "Michael Johnson",
    age: 60,
    medicalHistory: ["Heart Disease", "High Cholesterol"],
    condition: "Chronic Illness",
    treatmentPlan: "Statins and heart medication",
  },
  {
    name: "Emily Brown",
    age: 25,
    medicalHistory: ["Migraine"],
    condition: "Chronic Illness",
    treatmentPlan: "Pain management and lifestyle changes",
  },
  {
    name: "Sarah Wilson",
    age: 50,
    medicalHistory: ["Arthritis", "Obesity"],
    condition: "Chronic Illness",
    treatmentPlan: "Physical therapy and weight management program",
  },
];

// Insert dummy data into the database
export const seedPatients = async () => {
  try {
    await Patient.insertMany(patients);
    console.log("Dummy patient data inserted successfully");
    mongoose.disconnect(); // Close the connection
  } catch (err) {
    console.error(err);
  }
};

// Run the seeder function
seedPatients();