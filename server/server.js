require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const Article = require('./models/Article');
const fetchNews = require('./worker');
const Subscriber = require('./models/Subscriber');
const { sendVerificationEmail } = require('./mailer');
const crypto = require('crypto');


const app = express();
app.use(cors({ origin: "http://localhost:3000" })); 
app.use(express.json());

// 1. Connect to Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Error:', err));

// 2. Schedule "Sniper" Worker

// 🟢 CHANGED: Run every 45 minutes (*/45) instead of 15
cron.schedule('*/45 * * * *', () => {
  console.log('⏰ Cron Job: Checking for news...');
  fetchNews();
});

// Run once on startup
fetchNews();

// 3. API Endpoint: Get All News (with Filters)
app.get('/api/news', async (req, res) => {
  try {
    const category = req.query.category || 'general';
    let query = {};
    
    // Filter by category if one is selected (except 'general' shows all)
    if (category !== 'general') {
      // Case-insensitive match for safer filtering
      query = { category: { $regex: new RegExp(`^${category}$`, 'i') } };
    }

    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .limit(20);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 4. API Endpoint: Get Single Article
app.get('/api/news/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article" });
  }
});



// ... existing code ...

// 1. SUBSCRIBE Endpoint
app.post('/api/subscribe', async (req, res) => {
  console.log("1. Received Request:", req.body); // Check if frontend sent data

  try {
    const { email } = req.body;
    
    // Check DB
    console.log("2. Checking DB for existing user...");
    let subscriber = await Subscriber.findOne({ email });
    
    if (subscriber && subscriber.isVerified) {
      console.log("❌ User already exists and is verified.");
      return res.status(400).json({ message: "Already subscribed!" });
    }

    const token = crypto.randomBytes(20).toString('hex');

    // Save to DB
    console.log("3. Saving to Database...");
    if (!subscriber) {
      subscriber = await Subscriber.create({ email, verificationToken: token });
    } else {
      subscriber.verificationToken = token;
      await subscriber.save();
    }
    console.log("✅ Saved to DB.");

    // Send Email
    console.log("4. Attempting to send email...");
    console.log("   Using User:", process.env.EMAIL_USER); // (Don't log password)
    
    await sendVerificationEmail(email, token);
    console.log("✅ Email Sent Successfully.");

    res.json({ message: "Verification email sent!" });

  } catch (error) {
    console.error("🔥 CRITICAL ERROR:", error); // THIS WILL SHOW THE REAL REASON
    res.status(500).json({ message: error.message });
  }
});

// 2. VERIFY Endpoint
app.post('/api/verify', async (req, res) => {
  try {
    const { token } = req.body;
    const subscriber = await Subscriber.findOne({ verificationToken: token });
    
    if (!subscriber) return res.status(400).json({ message: "Invalid token" });

    subscriber.isVerified = true;
    subscriber.verificationToken = undefined; // Clear token
    await subscriber.save();

    res.json({ message: "Email Verified! You will now receive updates." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying" });
  }
});

// 3. UNSUBSCRIBE Endpoint
app.post('/api/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    await Subscriber.findOneAndDelete({ email });
    res.json({ message: "Unsubscribed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error unsubscribing" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));