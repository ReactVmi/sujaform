const { default: connectionSuja } = require("@/database/dbconstr");
const { default: Lead } = require("@/database/models/Lead");

export default async function POST(req, res) {
  const { orderId } = req.body;
  try {
   
    await connectionSuja();
    // Check if orderId is provided
    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }
    const result = await Lead.findOne({ _id: orderId,  del:0 });
    console.log("RESULT ORDER ID:",result);
    // Check if order with the given orderId exists
    if (!result) {
       return res.status(400).json({ error: "Orderid not found" });
    }
    res.status(200).json({ filterData: result });
    
  } catch (error) {
    console.error("Error in userFilter Index Api", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
