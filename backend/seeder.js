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
    medicalHistory: ["Diabetes", "Hypertension", "Obesity"],
    condition: "Type 2 Diabetes",
    treatmentPlan: "Insulin and blood pressure medications",
  },
  {
    name: "Jane Smith",
    age: 30,
    medicalHistory: [
      "Asthma",
      "Seasonal Allergies",
      "Gastroesophageal Reflux Disease",
    ],
    condition: "Asthma",
    treatmentPlan: "Inhaler and allergy medication",
  },
  {
    name: "Michael Johnson",
    age: 60,
    medicalHistory: ["Heart Disease", "High Cholesterol", "Stroke"],
    condition: "Coronary Artery Disease",
    treatmentPlan: "Statins and heart medication",
  },
  {
    name: "Emily Brown",
    age: 25,
    medicalHistory: ["Migraine", "Anxiety", "Insomnia"],
    condition: "Chronic Migraine",
    treatmentPlan: "Pain management and lifestyle changes",
  },
  {
    name: "Sarah Wilson",
    age: 50,
    medicalHistory: ["Arthritis", "Obesity", "Hypertension"],
    condition: "Osteoarthritis",
    treatmentPlan: "Physical therapy and weight management program",
  },
  {
    name: "David Taylor",
    age: 40,
    medicalHistory: ["Hyperthyroidism", "Anxiety", "Fatigue"],
    condition: "Hyperthyroidism",
    treatmentPlan: "Antithyroid medication and monitoring",
  },
  {
    name: "Laura Green",
    age: 55,
    medicalHistory: ["COPD", "Sleep Apnea", "Chronic Bronchitis"],
    condition: "Chronic Obstructive Pulmonary Disease",
    treatmentPlan: "Bronchodilators and pulmonary rehabilitation",
  },
  {
    name: "James White",
    age: 35,
    medicalHistory: ["Anxiety", "Depression", "High Blood Pressure"],
    condition: "Generalized Anxiety Disorder",
    treatmentPlan: "Cognitive behavioral therapy and medication",
  },
  {
    name: "Olivia Harris",
    age: 28,
    medicalHistory: ["Eczema", "Allergic Rhinitis", "Chronic Fatigue Syndrome"],
    condition: "Atopic Dermatitis",
    treatmentPlan: "Topical steroids and moisturizer",
  },
  {
    name: "Daniel Lewis",
    age: 62,
    medicalHistory: ["Prostate Cancer", "Hypertension", "High Cholesterol"],
    condition: "Prostate Cancer",
    treatmentPlan: "Hormone therapy and radiation therapy",
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