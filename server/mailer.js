const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.CLIENT_URL || "https://lotus-post-news.vercel.app"; 

// 1. Send Verification Email
const sendVerificationEmail = async (email, token) => {
  const link = `${SITE_URL}/verify?token=${token}`;
  
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Don't change this! (Free tier requirement)
      to: email, // Must be YOUR email for now
      subject: 'Action Required: Verify your subscription',
      html: `
        <h2>Welcome to Lotus Post</h2>
        <p>Click below to verify:</p>
        <a href="${link}">Verify Email</a>
      `
    });
    console.log("✅ Verification Email Sent:", data);
  } catch (error) {
    console.error("❌ Email Failed:", error);
  }
};

// 2. Send News Alert
const sendNewsAlert = async (email, article) => {
  const unsubscribeLink = `${SITE_URL}/unsubscribe?email=${email}`;
  const articleLink = `${SITE_URL}/article/${article._id}`; 

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `📰 ${article.title}`,
      html: `
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${articleLink}">Read More</a>
        <br/><br/>
        <small><a href="${unsubscribeLink}">Unsubscribe</a></small>
      `
    });
    console.log(`✅ News Email Sent to ${email}`);
  } catch (error) {
    console.error(`❌ News Email Failed:`, error);
  }
};

module.exports = { sendVerificationEmail, sendNewsAlert };