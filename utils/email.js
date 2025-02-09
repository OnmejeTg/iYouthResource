import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      // service: 'process.env.SERVICE',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        pass: process.env.APP_PASSWORD,
        user: process.env.SENDER_MAIL,
      },
    });

    const sendCompanyMail = await transporter.sendMail({
      from: "tonmeje@gmail.com",
      to: email,
      subject: "iYouth Email Verification",
      html: ` 
          <p>Dear User,
          <br>
          Thank you for registering with us. Your One Time Password (OTP) for email verification is:
          <br>
          <b>${otp}</b>
          <br>
          Please use this OTP to complete the verification process. If you have any questions or concerns, feel free to reach out to our support team.
          <br>
          Best regards,<br>
          iYouth Team </p>

          `,
      headers: {
        "x-priority": "1",
        "x-msmail-priority": "High",
        importance: "high",
      },
    });

    if (
      sendCompanyMail &&
      sendCompanyMail.response &&
      sendCompanyMail.response.startsWith("250")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export const sendSuccessRegEmail = async (email) => {
  // return console.log("email", message);
  try {
    const transporter = nodemailer.createTransport({
      // service: 'process.env.SERVICE',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        pass: process.env.APP_PASSWORD,
        user: process.env.SENDER_MAIL,
      },
    });

    const sendCompanyMail = await transporter.sendMail({
      from: "tonmeje@gmail.com",
      to: email,
      subject: "iYouth Verification Successful",
      html: ` 
          <p>
                Dear User,
            <br>
                Congratulations! Your account has been successfully verified.
            <br>
                You can login to your account to proceed
            <br>
                If you have any questions or need assistance, please don't hesitate to reach out to our support team. We are here to assist you every step of the way.                
            <br>
                Best regards,
            <br>
                iYouth Team 
          </p>
           
            `,
      headers: {
        "x-priority": "1",
        "x-msmail-priority": "High",
        importance: "high",
      },
    });

    if (
      sendCompanyMail &&
      sendCompanyMail.response &&
      sendCompanyMail.response.startsWith("250")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export const sendPassWordResetEmail = async (email, link) => {
  // return console.log("email", message);
  try {
    const transporter = nodemailer.createTransport({
      // service: 'process.env.SERVICE',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        pass: process.env.APP_PASSWORD,
        user: process.env.SENDER_MAIL,
      },
    });

    const sendCompanyMail = await transporter.sendMail({
      from: "tonmeje@gmail.com",
      to: email,
      subject: "iYouth Password Reset",
      html: ` 
          <p>
                Dear User,
            <br>
                Use the OTP below to reset your password. Valid for 15 min
            <br>
            ${link}
            <br>
                If you have any questions or need assistance, please don't hesitate to reach out to our support team. We are here to assist you every step of the way.                
            <br>
                Best regards,
            <br>
                iYouth Team 
          </p>
           
            `,
      headers: {
        "x-priority": "1",
        "x-msmail-priority": "High",
        importance: "high",
      },
    });

    if (
      sendCompanyMail &&
      sendCompanyMail.response &&
      sendCompanyMail.response.startsWith("250")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, "email not sent");
    return false;
  }
};

// export const sendContactEmail = async (email, name, message) => {
//   try {
//     // Configure Nodemailer Transporter with App Password
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465, // Use 465 for secure TLS/SSL or 587 for STARTTLS
//       secure: true, // true for 465, false for 587
//       auth: {
//         user: process.env.SENDER_MAIL, // Your Gmail address
//         pass: process.env.APP_PASSWORD, // Your App Password (not your Gmail password)
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: `"${name}" <${process.env.SENDER_MAIL}>`, // Sender's name and email
//       to: "tonmeje@gmail.com", // Recipient's email
//       subject: "New Contact Form Submission",
//       html: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//       headers: {
//         "X-Priority": "1",
//         "X-MSMail-Priority": "High",
//         Importance: "High",
//       },
//     };

//     // Send Email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email Sent:", info);

//     return info.accepted.length > 0; // Returns true if email was accepted
//   } catch (error) {
//     console.error("Error sending contact email:", error);
//     return false;
//   }
// };

export const sendContactEmail = async (email, name, message) => {
  try {
    const transporter = nodemailer.createTransport({
      // service: 'process.env.SERVICE',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        pass: process.env.APP_PASSWORD,
        user: process.env.SENDER_MAIL,
      },
    });

    const sendCompanyMail = await transporter.sendMail({
      from: "tonmeje@gmail.com",
      to: "bizgrowthapp@gmail.com",
      subject: "New Contact Form Submission",
      html: `<p><strong>Name</strong>: ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <strong>Message:</strong> <br/>${message}`,
      headers: {
        "x-priority": "1",
        "x-msmail-priority": "High",
        importance: "high",
      },
    });

    if (
      sendCompanyMail &&
      sendCompanyMail.response &&
      sendCompanyMail.response.startsWith("250")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, "email not sent");
  }
};
