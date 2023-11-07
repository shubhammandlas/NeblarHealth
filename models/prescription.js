const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patient: {
    nhi: {
      type: String,
      unique: true,
      index: true,
    },
    name: String,
  },
  date: String,
  medications: [
    {
      id: String,
      dosage: String,
      _id: false
    },
  ],
});

const Prescription = mongoose.model("Prescription", prescriptionSchema, "prescriptions");
module.exports = Prescription;
