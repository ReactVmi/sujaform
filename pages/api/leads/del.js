import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function del(req, res) {
  try {
    await connectionSuja();
    const { leadId } = req.query;
    const deletedLead = await Lead.findByIdAndDelete(leadId);
    console.log(deletedLead, "Leads");
    if (!deletedLead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
