var nodemailer = require("nodemailer");
import jwt from "jsonwebtoken";
//-----------------------------------------------------------------------------

export async function sendMail(subject, toEmail, otpText) {
  
  var transport = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: process.env.SMTPPORT,
    auth: {
      user: process.env.SMTPUSERNAME,
      pass: process.env.SMTPPASSWORD
    }
  });


 // console.log(transport);
  let mailOptions = {
    from: process.env.SMPTPFROMEMAIL,
    to: toEmail,
    subject: subject,
    text: otpText
  };

  transport.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}

export const register_user = async formData => {
  try {
    const res = await fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(formData)
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log("Error in register_user (service) => ", error);
    return error.message;
  }
};

export const login_user = async formData => {
  try {
    const res = await fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(formData)
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log("Error in login_user (service) => ", error);
    // console.log("C ", res, formData);
    return error.message;
  }
};

export const autoLogin =  user => {

  if (user && user.email && user._id && user.fname && user.lname && user.phone && user.role) {
    const  token = jwt.sign(
      { email: user.email, id: user._id, fname: user.fname, lname: user.lname, phone: user.phone, role: user.role },
      "secret",
      { expiresIn: "1h" }
    );
    return token;
  } else {
    return false;
  }
};



