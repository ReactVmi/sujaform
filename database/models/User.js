import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    leads: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    postalcode: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: "customer" },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
