import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function GET(req, res) {
  let pageNo = req.query.page ? parseInt(req.query.page) : 0;
  let Limit = req.query.limit ? parseInt(req.query.limit) : 5;
  let skip = pageNo * Limit;
  console.log("Load More", pageNo, Limit, skip);

  try {
    await connectionSuja();

    // Count the documents that match the criteria
    const totalCount = await Lead.countDocuments({
      del: 0,
      $or: [
        { 'step2.dr_course_type': 'guaranteed_pass' },
        { 'step2.dr_course_type': 'speedster' }
      ]
    });

    // Find the documents that match the criteria
    const leads = await Lead.find({
      del: 0,
      $or: [
        { 'step2.dr_course_type': 'guaranteed_pass' },
        { 'step2.dr_course_type': 'speedster' }
      ]
    })
      .limit(Limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();

    // Send the response with all the data
    res.json({
      totalCount,
      totalPages: Math.ceil(totalCount / Limit),
      currentPage: pageNo,
      leads,
    });

    console.log("LEADS INDEX API");
  } catch (error) {
    console.error("Error fetching leads:", error);

    // Handle the error and send an error response
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
