import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function GET(req, res) {
  let pageNo = req.query.page ? req.query.page : 0;
  let limit = req.query.limit ? req.query.limit : 10;
  let skip = pageNo * limit;

  try {
    await connectionSuja();

    const leads = await Lead.find({ del: 0 })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt field
      .populate("user");

    if (leads.length  > 0) {
      const filteredLeads = leads.filter(
        lead => lead.step2.dr_course_type === 'guaranteed_pass' || lead.step2.dr_course_type === 'speedster'
      );

      if (filteredLeads.length > 0) {
        return res.json(filteredLeads);
      } else {
        return res.status(404).send("No Leads Data for Guaranteed_pass or Speedster courses");
      }
    } else {
      return res.status(404).send("No Leads Data");
    }
  } catch (error) {
    console.error("Error fetching leads:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
