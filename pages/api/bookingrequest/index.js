import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function GET(req, res) {
  let pageNo = req.query.page ? req.query.page : 0;
  let limit = req.query.limit ? req.query.limit : 5;
  let skip = pageNo * limit;
  console.log(pageNo, limit, skip);

  try {
    await connectionSuja();

    const leads = await Lead.find({ del: 0 })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate("user");

    if (leads.length > 0) {
      const filteredLeads = leads.filter(
        lead => lead.step2.dr_course_type === 'regular' || lead.step2.dr_course_type === 'crash'
      );

      if (filteredLeads.length > 0) {
        return res.json(filteredLeads);
      }
    }

    return res.status(404).send("No Leads Data");
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
