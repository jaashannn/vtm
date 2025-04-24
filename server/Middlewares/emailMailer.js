const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // added new
  service: "Gmail", // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: process.env.MAILER_EMAILID,
    pass: process.env.MAILER_EMAILPASS,
  },
  tls: {
    ciphers: "SSLv3", // Ensure TLS protocol compatibility
  },
});

async function sendOTP(email, name, otp) {
  const mailOptions = {
    from: `"OTP verification | Virtual Tech Masters" <${process.env.MAILER_EMAILID}`,
    to: email,
    subject: "Welcome to Virtual Tech Masters Ltd.",
    html: ` <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 8px rgba(0,0,0,0.1);">

    <div style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="margin: 0; font-size: 24px;">Your OTP Code: ${otp}</h1>
    </div>

    <div style="padding: 20px;">
      <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
        Hi <strong>${name}</strong>,  
      </p>
      <p style="font-size: 16px; color: #555; margin-bottom: 15px;">
        Thank you for requesting access. Please use the One-Time Password (OTP) below to complete your verification process. This OTP is valid for <strong>10 minutes</strong>.
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <div style="display: inline-block; font-size: 24px; font-weight: bold; color: #007bff; background: #f1f9ff; padding: 10px 20px; border: 1px solid #007bff; border-radius: 5px; letter-spacing: 2px;">
          ${otp}
        </div>
      </div>

      <p style="font-size: 14px; color: #555; margin-bottom: 10px;">
        If you did not request this OTP, please ignore this email or contact support if you have concerns.
      </p>
    </div>

    <div style="background-color: #f9f9f9; text-align: center; padding: 15px; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #999; margin: 0;">
        If you need further assistance, please contact our support team at <a href="mailto:tickets@overseastravels.net" style="color: #007bff; text-decoration: none;">tickets@overseastravels.net</a>.
      </p>
    </div>

  </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return;
  }
}

async function contactMesage(emailId, name) {
  const mailOptions = {
    from: `"Virtual Tech Masters" <${process.env.MAILER_EMAILID}`,
    to: emailId,
    subject: "Thank You for Contacting Overseas Travels Ltd.",
    html: `
    <p>Dear ${name}</p> <br/>
    <p>Thank you for reaching out to Overseas Travels Ltd. We appreciate your inquiry and look forward to assisting you.  </p>
    <p>One of our customer service representatives will get back to you as soon as they become available. In the meantime, if you need urgent assistance, please feel free to contact us at <a href="tel:8555532720"style="color: #007bff; text-decoration: none;"><strong>855-553-2720</strong></a> or email us at <a href="mailto:tickets@overseastravels.net" style="color: #007bff; text-decoration: none;">tickets@overseastravels.net</a></p>
    <p>Thank you for choosing Overseas Travels Ltd.</p>
    <br />
    <p>Kind regards,</p>
   <strong>Customer Support Team</strong> <br/>
   <strong>Overseas Travels Ltd.</strong> <br/>
    Phone: <a href="tel:8555532720"style="color: #007bff; text-decoration: none;">855-553-2720</a> <br/>
    Email: <a href="mailto:tickets@overseastravels.net" style="color: #007bff; text-decoration: none;">tickets@overseastravels.net</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return;
  }
}


async function signUpMessage (emailId, name){
  const mailOptions = {
    from: `"Overseas Travels " <${process.env.MAILER_EMAILID}`,
    to: emailId,
    subject: "Welcome to Overseas Travels Ltd.",
    html: `
    <p>Dear ${name}</p> <br/>
    <p>Thank you for registering on our website. We’ve received your request and will contact you within one working day.</p>
    <p>If you have any urgent inquiries, feel free to reach us at:</p> <br /> <br/>
    <strong>📞 Phone: </strong> <a href="tel:8555532720"style="color: #007bff; text-decoration: none;">855-553-2720</a> <br/>
    <strong>📧 Email:  </strong> <a href="mailto:tickets@overseastravels.net" style="color: #007bff; text-decoration: none;">tickets@overseastravels.net</a> <br />
    <p>We look forward to working together!</p>
     <strong>Best regards,</strong> <br/>
      <strong>Overseas Travels Ltd.</strong>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return;
  }
}


async function mailToCompany (emailId, name, number, message, enquiryFor){
  let enquiryForDetails = '';
  if (typeof enquiryFor === 'object' && enquiryFor !== null) {
    for (let key in enquiryFor) {
      if (enquiryFor.hasOwnProperty(key)) {
        enquiryForDetails += `${key}: ${enquiryFor[key]} <br />`;
      }
    }
  } else if (typeof enquiryFor === 'string') {
    enquiryForDetails = enquiryFor; // Use the string directly
  } else {
    enquiryForDetails = 'No additional details provided.';
  }
  const mailOptions = {
    from: `"${emailId}" <${process.env.MAILER_EMAILID}`,
    to: "tickets@overseastravels.net",
    subject: "Customer Enquiry",
    html: `
    <h2> Request By Customer </h2>
    Email: ${emailId} <br/>
    Name: ${name} <br/>
    Number:${number} <br />
    Message:${message} <br/>
   <h3>Enquiry Details:</h3>
   ${enquiryForDetails}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return;
  }
}
module.exports = { sendOTP, contactMesage,signUpMessage,mailToCompany };
