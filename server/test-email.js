require('dotenv').config(); // Load .env file
const nodemailer = require('nodemailer');

async function main() {
  console.log("1. Reading .env file...");
  console.log("   User:", process.env.EMAIL_USER);
  console.log("   Pass:", process.env.EMAIL_PASS ? "**** (Exists)" : "MISSING ❌");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  console.log("2. Attempting to send email...");
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to yourself
      subject: "Test Email from Lotus Post",
      text: "If you see this, your email configuration works!"
    });

    console.log("✅ SUCCESS! Email sent: " + info.messageId);
  } catch (error) {
    console.error("❌ FAILED. Here is the exact error:");
    console.error(error.message);
    
    if (error.message.includes("Invalid login")) {
      console.log("\n💡 HINT: Your App Password is likely wrong or contains spaces.");
    }
    if (error.message.includes("Username and Password not accepted")) {
      console.log("\n💡 HINT: You might be using your normal Gmail password. You MUST use an App Password.");
    }
  }
}

main();