const nodemailer = require('nodemailer');

// 1. Configure Transport (Good job on port 465!)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔴 FIX: Detect if we are Live or Local
// You can set CLIENT_URL in Render, or just hardcode your Vercel link here for safety
const SITE_URL = process.env.CLIENT_URL || "https://lotus-post-news.vercel.app"; 

// Identity
const SENDER_IDENTITY = `"Lotus Post Team" <${process.env.EMAIL_USER}>`;

// 2. Send Verification Email
const sendVerificationEmail = async (email, token) => {
  const link = `${SITE_URL}/verify?token=${token}`; // Now points to Vercel
  
  const mailOptions = {
    from: SENDER_IDENTITY,
    to: email,
    subject: 'Action Required: Verify your subscription',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #000;">Welcome to Lotus Post.</h2>
        <p>You are one step away from joining our global intelligence feed.</p>
        <p>Please verify your email address to confirm your subscription.</p>
        <br/>
        <a href="${link}" style="background:#2563EB; color:white; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;">Verify Email</a>
        <br/><br/>
        <p style="font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// 3. Send News Alert
const sendNewsAlert = async (email, article) => {
  const unsubscribeLink = `${SITE_URL}/unsubscribe?email=${email}`;
  // NOTE: Your article._id link assumes you have a page for individual articles.
  // If not, maybe point to the homepage for now: `${SITE_URL}`
  const articleLink = `${SITE_URL}/article/${article._id}`; 

  const mailOptions = {
    from: SENDER_IDENTITY, 
    to: email,
    subject: `📰 ${article.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
        <h2 style="color: #2563EB; margin-bottom: 10px;">${article.title}</h2>
        <p style="font-size: 16px; line-height: 1.5;">${article.description}</p>
        
        <div style="margin-top: 20px;">
          <a href="${articleLink}" style="color: #2563EB; font-weight:bold; text-decoration: none;">Read full story →</a>
        </div>
        
        <hr style="margin-top: 40px; border:0; border-top:1px solid #eee;" />
        
        <p style="font-size: 11px; color: #999; text-align: center;">
          Sent with AI precision by the <strong>Lotus Post Team</strong>.
          <br/>
          <a href="${unsubscribeLink}" style="color: #999; text-decoration: underline;">Unsubscribe</a> from these alerts.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${email}`);
  } catch (err) {
    console.error(`❌ Failed to email ${email}:`, err.message);
  }
};

module.exports = { sendVerificationEmail, sendNewsAlert };