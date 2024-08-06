import mongoose from "mongoose";
import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import bcrypt, { genSalt } from "bcrypt";

export default async (req, res) => {
  let { id, password } = req.body;
 
  try {
    await connectionSuja();
    const user = await User.findById(id);
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.password, salt);
      user.password = hashPassword;
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Password has been updated successfully", success: true });
    await mongoose.connection.close();
  } catch (error) {
    console.log("User Post Request Error", error);
    res.status(400).json({ mesg: "Error updating Password", success: false });
  }
};
