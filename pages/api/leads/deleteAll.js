import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function(req, res) {
  try {
    await connectionSuja();
    const result = await Lead.find({ del: 1 }).deleteMany();
    if (result.deletedCount === 0) {
      res.json({ msg: "Error While Deleting All" });
    } else {
      res.json({ count: result.deletedCount });
    }
  } catch (error) {
    console.log(error);
  }
}
