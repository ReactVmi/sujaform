import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default async (req, res) => {
  await connectionSuja();

  const { email, password } = req.body;

  const { error } = schema.validate({ email, password });

  if (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: error.details[0].message.replace(/['"]+/g, ""),
      });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Account doesn't exist, please sign up.",
        });
    }

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Something went wrong" });
        }
        if (result) {
          //console.log(result)
          const token = jwt.sign(
            { email: user.email, id: user._id, fname: user.fname, lname: user.lname, phone: user.phone, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res
            .status(200)
            .json({ success: true, message: "Login Successfull", token });
        } else {
          return res
            .status(401)
            .json({ success: false, message: "Password is Incorrect" });
        }
      });
    }
  } catch (error) {
    console.log("Error in login_user (server) => ", error);

    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
