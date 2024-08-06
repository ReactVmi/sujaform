import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";
import { v4 as uuidv4 } from "uuid";

export default async function POST(req, res) {
  await connectionSuja();
  const requestData = req.body;

  try {
    // Generate a crypto-based unique id
    const uniqueId = uuidv4();
    const truncID = uniqueId.substring(0, 5);
    requestData._id = truncID;

    const newLead = await new Lead(requestData);
    await newLead.save();
    res.status(200).json(newLead);
  } catch (error) {
    console.error("Error saving lead:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
