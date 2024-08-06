import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function handler(req, res) {
  const { leadId } = req.query;
  try {
    await connectionSuja();
    const updatedLead = await Lead.findById({ _id: leadId });
    if (!updatedLead) {
      return res.status(404).json({ msg: "Lead not found" });
    } else {
      updatedLead.del = !updatedLead.del;
      updatedLead.del = Boolean(updatedLead.del);
      updatedLead.save();
      res.json({ msg: updatedLead });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
