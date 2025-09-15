import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["seller", "buyer", "admin"] },
  phone: { type: String, required: true },
  address: { type: String, required: true }
});

export default mongoose.model("User", userSchema);
