// Import necessary libraries and models
import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import bcrypt from "bcrypt";

export default async (req, res) => {

  let newPassword = await req.body.password;
  let token = await req.body.token;

  try {
    await connectionSuja();
    console.log(token);

    // Find user by token
    const user = await User.findOne({ password: token });

    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      user.password=null;
      console.log("Password updated successfully");
      res.status(200).send("Success");
    } 
    // else {
    //   res.status(404).json({ error: "User not found Invalid Token" });
    // }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
