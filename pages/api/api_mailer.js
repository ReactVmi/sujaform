import { sendMail } from "@/app/service/mailService";

const handler = async (req, res) => {
  const dynamicURL = req.headers.host;

  try {
    const { method } = req;

    switch (method) {
      case "POST": {
        const { formdata } = req.body;

        if (!formdata) {
          return res.status(400).json({ error: "Invalid request body" });
        }

        // Extract each step from formdata
        const { step1, step2, step3, step4, step5, step6 } = formdata;
        console.log("API Mailer", formdata);

        // Check for required steps, but allow the absence of step6
        if (!step1 || !step2 || !step3 || !step4 || !step5) {
          return res.status(400).json({ error: "Incomplete form data" });
        }

        const { postal_code } = step1;

        let fastTrackPractical, fastTrackTheory, iHaveAlready;

        if (step3) {
          if (step3.i_have_already) {
            iHaveAlready = `<p style=font-size:12px;line-height:1.4;margin:0;color:#666;padding:0>Already ${step3.i_have_already}</p>`;
          } else {
            iHaveAlready = '';
          }
        }

        // Include other required fields
        const emailContent = `<html lang=en><style>table br{display:none}</style><div id=__react-email-preview style=display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0>Suja Receipt<div></div></div><body style='font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;background-color:#fff'><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:760px"><tr style=width:100%><td><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100%><tr><td><td><img alt=" Logo"height=42 src=https://sujadrivingschool.co.uk/wp-content/uploads/2019/04/apple-icon-152x152.png style=display:block;outline:0;border:none;text-decoration:none width=42><td style=display:table-cell align=right><p style="font-size:32px;line-height:24px;margin:16px 0;font-weight:300;color:#888">Suja Booking Receipt</table><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style="border-collapse:collapse;border-spacing:0;color:#333;background-color:#fafafa;border-radius:3px;font-size:12px;margin:30px 0 15px 0;height:24px"><tr><td><p style=font-size:14px;line-height:24px;margin:0;background:#fafafa;padding-left:10px;font-weight:500>Customer Details</table><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style=border-collapse:collapse;border-spacing:0;color:#333;background-color:#fafafa;border-radius:3px;font-size:12px><tr><td><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style=height:46px><tbody style=width:100%><tr style=width:100%><td colspan=2><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100%><tbody style=width:100%><tr style=width:100%><td style="padding-left:20px;border-style:solid;border-color:#fff;border-width:0 1px 1px 0;height:44px"><p style=font-size:10px;line-height:1.4;margin:0;padding:0;color:#666>EMAIL</p><a style=color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4 target=_blank>${step4.email}</a></table><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100%><tbody style=width:100%><tr style=width:100%><td style="padding-left:20px;border-style:solid;border-color:#fff;border-width:0 1px 1px 0;height:44px"><p style=font-size:10px;line-height:1.4;margin:0;padding:0;color:#666>NAME<p style=font-size:12px;line-height:1.4;margin:0;padding:0;text-transform:capitalize>${step4.firstName} ${step4.surname}</table><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100%><tbody style=width:100%><tr style=width:100%><td style="padding-left:20px;border-style:solid;border-color:#fff;border-width:0 1px 1px 0;height:44px"><p style=font-size:10px;line-height:1.4;margin:0;padding:0;color:#666>ORDER ID</p><a style=color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4 target=_blank>${formdata._id}</a><td style="padding-left:20px;border-style:solid;border-color:#fff;border-width:0 1px 1px 0;height:44px"><p style=font-size:10px;line-height:1.4;margin:0;padding:0;color:#666>PHONE NO.</p><a style=color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4 target=_blank>${step4.phone_number}</p></table><td style="padding-left:20px;border-style:solid;border-color:#fff;border-width:0 1px 1px 0;height:44px"colspan=2><p style=font-size:10px;line-height:1.4;margin:0;padding:0;color:#666>POSTAL CODE<p style=font-size:12px;line-height:1.4;margin:0;padding:0>${postal_code}</table></table><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style="border-collapse:collapse;border-spacing:0;color:#333;background-color:#fafafa;border-radius:3px;font-size:12px;margin:30px 0 15px 0;height:24px"><tr><td><p style=font-size:14px;line-height:24px;margin:0;background:#fafafa;padding-left:10px;font-weight:500>Course Details</table><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100%><tr><td><td style=width:64px><img alt="Suja icon"height=64 src=https://sujadrivingschool.co.uk/wp-content/uploads/2019/04/apple-icon-152x152.png style="display:block;outline:0;border:1px solid rgba(128,128,128,.2);text-decoration:none;margin:0 0 0 20px;border-radius:14px"width=64><td style=padding-left:22px>${Object.keys(step2.dr_course_price).map((courseKey, index) => ( `<p style=font-size:12px;line-height:1.4;margin:0;font-weight:600;padding:0 key=${index}>${step2.dr_course_price[courseKey].value} ${step2.dr_course_price[courseKey].variant} ${step2.dr_course_type} - ${step2.dr_type} - ${step6 ? step6.payment : 0}</p>` ))}${iHaveAlready}<a style=color:#0070c9;text-decoration:none;font-size:12px target=_blank href="${dynamicURL}/customer" data-saferedirecturl="${dynamicURL}/dashboard">Go to Dashboard</a><span style=margin-left:4px;margin-right:4px;color:#333;font-weight:200>|</span><a style=color:#0070c9;text-decoration:none;font-size:12px target=_blank href="${dynamicURL}/customer/orders" data-saferedirecturl="">View Order</a><td style="display:table-cell;padding:0 20px 0 0;width:100px;vertical-align:top"align=right><p style=font-size:12px;line-height:24px;margin:0;font-weight:600>Total Price: £${step6 ? step6.amount:0}</table><hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0 0 0"><p style="font-size:12px;line-height:auto;margin:20px 0;color:#666;text-align:center">To change your account details. If you have opted out, you can still view your receipts in your account under Order History. go to <a style=color:#067df7;text-decoration:none target=_blank href="${dynamicURL}/customer/profile">Account Settings.</a><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100%><tr><td><td style="display:block;margin:40px 0 0 0"align=center><img alt="Suja Icon"height=26 src=https://sujadrivingschool.co.uk/wp-content/uploads/2019/04/apple-icon-152x152.png style=display:block;outline:0;border:none;text-decoration:none width=26></table><p style="font-size:12px;line-height:24px;margin:8px 0 0 0;text-align:center;color:#666"><a style=color:#067df7;text-decoration:none target=_blank href=#>Account Settings</a> • <a style=color:#067df7;text-decoration:none target=_blank href=#>Terms of Sale</a> • <a style=color:#067df7;text-decoration:none target=_blank href=#>Privacy Policy</a><p style="font-size:12px;line-height:24px;margin:25px 0 0 0;text-align:center;color:#666">Copyright © 2023 Suja Driving School.<br><a style=color:#067df7;text-decoration:none target=_blank href="">All rights reserved</a>
        `;
        
        

        try {
          // Send the email
          await sendMail("Suja Booking Receipt" , `sujadrivingschool.official@gmail.com,${step4.email}`, emailContent);

          // Log a success message
          console.log("Email sent successfully");

          // Send a response to the client
          res.status(200).send("Success");
        } catch (error) {
          // Handle errors
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Error sending email" });
        }
        break;
      }
      case "GET": {
        // Do something for GET requests if needed
        res.status(200).send(req.auth_data);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;


