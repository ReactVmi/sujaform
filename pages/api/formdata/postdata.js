import  connectionSuja  from "@/database/dbconstr";
import { leadData } from "@/database/models/schema";

export default async function POST(req, res) {
  const { Name, postalCode,Email } = req.body; 
  try {
    await connectionSuja();
    const newData = new leadData({
      fname: Name,
      lname: "Sha23h",
      company: "New Company",
      position: "New Position",
      year: "2024",
      postalcode: postalCode,
      email:Email
    });
    const result = await newData.save();
    res.status(200).json({ result, success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}