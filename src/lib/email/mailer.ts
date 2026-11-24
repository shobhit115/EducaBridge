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

export async function sendTeacherCredentialsEmail(
  toEmail: string,
  fullName: string,
  password: string
) {
  const firstName = fullName.trim().split(" ")[0] || "Teacher";
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: `Welcome to EducaBridge Academy – Your Instructor Login Details`,
    text: `Hi ${firstName},\n\nYou have been added as an instructor on EducaBridge Academy.\n\nLogin Email: ${toEmail}\nTemporary Password: ${password}\n\nPlease sign in at https://educabridgeacademy.com/signin and change your password immediately.\n\nWelcome aboard!\n– EducaBridge Academy Admin`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px;">
        <h2 style="color: #09265D; margin-top: 0;">Welcome to EducaBridge Academy, ${firstName}!</h2>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          You have been registered as an <strong>instructor</strong> on the EducaBridge Academy platform. Here are your login credentials:
        </p>
        <div style="margin: 20px 0; padding: 16px; background-color: #F2F6FF; border-radius: 12px;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #475569;"><strong>Login Email:</strong></p>
          <p style="margin: 0 0 16px; font-size: 15px; font-weight: 700; color: #09265D;">${toEmail}</p>
          <p style="margin: 0 0 8px; font-size: 13px; color: #475569;"><strong>Temporary Password:</strong></p>
          <p style="margin: 0; font-family: monospace; font-size: 18px; font-weight: 700; letter-spacing: 2px; color: #2458CC;">${password}</p>
        </div>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
          Please sign in and <strong>change your password immediately</strong> for security. If you have any questions, contact the admin team.
        </p>
      </div>
    `,
  });
}

export async function sendAdminLoginOtpEmail(toEmail: string, otp: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: `[Admin Security] ${otp} is your EducaBridge Admin login code`,
    text: `Admin Login Verification Code: ${otp}\n\nUse this 6-digit code to complete sign-in to the EducaBridge Academy Admin Dashboard. This code expires in 10 minutes.\n\nIf you did not request this, please secure your credentials immediately.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="margin-bottom: 16px;">
          <h2 style="color: #09265D; margin: 0; font-size: 20px;">EducaBridge Academy Admin Portal</h2>
          <p style="color: #64748b; font-size: 12px; margin-top: 4px;">Two-Factor Authentication Security Alert</p>
        </div>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          A sign-in request was initiated for your administrator account. Enter the 6-digit security verification code below to authorize your session:
        </p>
        <div style="margin: 24px 0; padding: 18px; background-color: #09265D; border-radius: 12px; text-align: center;">
          <span style="font-family: monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #ffffff;">
            ${otp}
          </span>
        </div>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-bottom: 0;">
          This code is valid for <strong>10 minutes</strong> and can only be used once. If you did not make this request, please change your administrator password immediately.
        </p>
      </div>
    `,
  });
}
