import connectionSuja from "@/database/dbconstr";
import Lead from "@/database/models/Lead";

export default async function handler(req, res) {
  await connectionSuja();
  const { query: { id }, method, body } = req;
  //res.status(200).send(method)
  try {
    switch (method) {
      case "PUT":

        const lead = await Lead.findOneAndUpdate({_id:  id}, body, {
          returnOriginal: false
        });
        res.status(200).send(lead)
        break;
      default:
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
