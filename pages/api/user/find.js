import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import mongoose from "mongoose";


export default async function GET(req, res) {
  let { email } = req.query;
  
  try {
    await connectionSuja();
    const user = await User.findOne({ email: email })
    console.log(email);
    if(user)
    {
      res.status(200).json({ success: true, user: user });
    }
    else
    {
      res.status(200).json({ success: false, error: "user not found" });
    }
  } catch (error) {
    res.status(200).json({ success: false, error: "user not found" });
  }
}

