import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import Joi from "joi";
import bcrypt from "bcrypt";

const schema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default async (req, res) => {
  await connectionSuja();

  const { fname, lname, phone, role, email, password } = req.body;

  const { error } = schema.validate({ fname, lname, phone, role, email, password });

  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });
  }

  try {
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exists, please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ fname, lname, phone, role, email, password: hashPassword });

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "Account created successfully" });
    }
  } catch (error) {
    console.log("Error in register_user (server) => ", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};