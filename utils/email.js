import * as Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async (email, otp) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "iYouth Email Verification";
    sendSmtpEmail.htmlContent = ` 
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
          `;
    sendSmtpEmail.sender = { name: "iYouth Team", email: process.env.SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: email }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    // console.log(data);
    if (data && data.body && data.body.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error, "email not sent");
    return false;
  }
};

export const sendSuccessRegEmail = async (email) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "iYouth Verification Successful";
    sendSmtpEmail.htmlContent = ` 
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
            `;
    sendSmtpEmail.sender = { name: "iYouth Team", email: process.env.SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: email }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    if (data && data.body && data.body.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error, "email not sent");
    return false;
  }
};

export const sendPassWordResetEmail = async (email, link) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "iYouth Password Reset";
    sendSmtpEmail.htmlContent = ` 
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
            `;
    sendSmtpEmail.sender = { name: "iYouth Team", email: process.env.SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: email }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    // console.log(data);
    if (data && data.body && data.body.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error, "email not sent");
    return false;
  }
};

export const sendContactEmail = async (email, name, message) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "New Contact Form Submission";
    sendSmtpEmail.htmlContent = `<p><strong>Name</strong>: ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <strong>Message:</strong> <br/>${message}`;
    
    sendSmtpEmail.sender = { name: "iYouth Contact Form", email: process.env.SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: process.env.SMTP_USER }];
    sendSmtpEmail.replyTo = { email: email, name: name };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    if (data && data.body && data.body.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error, "email not sent");
    return false;
  }
};
