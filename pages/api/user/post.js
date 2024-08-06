import mongoose from "mongoose";
import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import bcrypt from "bcrypt";

export default async (req, res) => {
  let { fname, lname, phone, role, email, password,postalcode } = req.body;
 
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt);
    await connectionSuja();
    const user = new User({ fname, lname, phone, role, email, password,postalcode });
    await user.save();
    res.status(200).json(user);
    await mongoose.connection.close();
  } catch (error) {
    console.log("User Post Request Error", error);
  }
};
