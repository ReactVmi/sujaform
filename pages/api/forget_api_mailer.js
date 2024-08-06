// forgotapimailer file code
import { sendMail } from "@/app/service/mailService";
import connectionSuja from "@/database/dbconstr";
import User from "@/database/models/User";
import { useRouter } from 'next/router';

const handler = async (req, res) => {
  try {
    const { method } = req;

    switch (method) {
      case "POST": {
        const { formdata } = req.body;

        if (!formdata) {
          return res.status(400).json({ error: "Invalid request body" });
        }

        try {
            await connectionSuja();
          const email = formdata.email;
          const checkEmailFromUser = await User.find({ email }).maxTime(10000);
          
          if (checkEmailFromUser.length > 0) {
            const userPassword = checkEmailFromUser[0].password;
            console.log("Password From Email ",userPassword);
            let check= req.headers.host;
            const emailContent = `<a href="http://${check}/resetpassword?token=${userPassword}">Click to reset password</a>`;
            await sendMail("Suja Forget Password", email, emailContent);
           
            res.status(200).send({success:true,message:"Success"});
          } else {
            res.status(404).json({ message:"User not found" });
          }
        } catch (error) {
          // Handle errors
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Error sending email" });
        }
        break;
      }
      default:
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message
    });
  }
};

export default handler;
