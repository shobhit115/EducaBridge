import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationOtpEmail(
  toEmail: string,
  fullName: string,
  otp: string
) {
  const firstName = fullName.trim().split(" ")[0] || "Student";

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: `${otp} is your EducaBridge Academy verification code`,
    text: `Hi ${firstName},\n\nYour 6-digit verification code for EducaBridge Academy is: ${otp}\n\nThis code expires in 10 minutes. If you did not request this, please ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
        <h2 style="color: #09265D; margin-top: 0;">Verify your email address</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
          Hi ${firstName}, enter the 6-digit verification code below to complete your <strong>EducaBridge Academy</strong> student registration:
        </p>
        <div style="margin: 24px 0; padding: 16px; background-color: #F2F6FF; border-radius: 12px; text-align: center;">
          <span style="font-family: monospace; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #09265D;">
            ${otp}
          </span>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">
          This code expires in <strong>10 minutes</strong>. If you didn't request this code, you can safely ignore this message.
        </p>
      </div>
    `,
  });
}