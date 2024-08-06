import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";

export default async function del(req, res) {
  try {
    await connectionSuja();
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);
    console.log(deletedUser, "User");
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully",success:true });
  } catch (error) {
    console.error("Error deleting User", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
