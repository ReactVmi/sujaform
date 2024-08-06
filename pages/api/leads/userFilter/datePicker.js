const { default: connectionSuja } = require("@/database/dbconstr");
const { default: Lead } = require("@/database/models/Lead");

export default async function POST(req, res) {
  const { start, end } = req.body;
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Set the end date to the end of the selected day
  endDate.setDate(endDate.getDate() + 1); // Move to the next day
  endDate.setMilliseconds(endDate.getMilliseconds() - 1); // Adjust to the end of the day

  await connectionSuja();

  try {
    const dateFilter = await Lead.find({
      del: 0,
      createdAt: { $gte: startDate, $lt: endDate },
      $or: [
        { 'step2.dr_course_type': 'guaranteed_pass' },
        { 'step2.dr_course_type': 'speedster' }
      ]
    });

    res.status(200).json({ msg: dateFilter });
    // console.log(dateFilter);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}
