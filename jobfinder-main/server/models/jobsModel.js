import mongoose, { Schema } from "mongoose";
import JWT from "jsonwebtoken";



// Remplacez "votre_clé_secrète" par votre vraie clé secrète
const JWT_SECRET_KEY = "57b9a4eec9243f0e6654cb870e10fbd68f1e4449aa293117ef2c88867f58321f";

const jobSchema = new mongoose.Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Companies" },
    jobTitle: { type: String, required: [true, "Job Title is required"] },
    jobType: { type: String, required: [true, "Job Type is required"] },
    location: { type: String, required: [true, "Location is required"] },
    salary: { type: Number, required: [true, "Salary is required"] },


    vacancies: { type: Number },
    experience: { type: Number, default: 0 },
    detail: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);


jobSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
