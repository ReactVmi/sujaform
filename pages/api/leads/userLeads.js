import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import Lead from "@/database/models/Lead";
import mongoose from "mongoose";
import jwtDecode from "jwt-decode";
import { ObjectId } from "mongodb";

export default async function GET(req, res) {
  const { cookies } = req;
  const token = cookies.token;
  const decoded = jwtDecode(token);
  const id = decoded.id;

  try {
    await connectionSuja();
    const leads = await Lead.find({ user: id }).sort({ createdAt: -1 });
    res.send({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
