import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function GET(req, res) {
  let pageNo = req.query.page ? req.query.page : 0;
  let Limit = req.query.limit ? req.query.limit : 30;
  let skip = pageNo * Limit;

  try {
    await connectionSuja();
    const leads = await Lead.find({del:1})
      .limit(Limit)
      .skip(skip)
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt field
      .populate("user")
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.log(err);
      });
      
    res.send(leads);
    console.log("LEADS INDEX API");
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
