const axios = require('axios');
const Article = require('./models/Article');
const Subscriber = require('./models/Subscriber');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require('nodemailer'); // 1. Import Nodemailer

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-flash"; 
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const CATEGORIES = ['india', 'general', 'technology', 'business', 'sports', 'science'];
const DAILY_LIMIT = 35; 

// 2. Configure Email Transporter (With Antivirus Fix)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false } // 🟢 Fixes "Self-signed certificate" error
});

const fetchNews = async () => {
  try {
    // 1. CHECK DAILY LIMIT
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const recentCount = await Article.countDocuments({ 
        publishedAt: { $gte: yesterday } 
    });

    console.log(`📊 Daily Usage: ${recentCount} / ${DAILY_LIMIT} articles generated.`);

    if (recentCount >= DAILY_LIMIT) {
        console.log("🛑 Daily limit reached. Saving AI quota for tomorrow.");
        return; 
    }

    // 2. SNIPER LOGIC
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    console.log(`🤖 Worker started... Target: [ ${randomCategory.toUpperCase()} ]`);

    let url = "";
    // We use 'search' endpoint with 'q=news' to get everything in that category, sorted by newest
if (randomCategory === 'india') {
  url = `https://gnews.io/api/v4/search?q=india&lang=en&sortby=publishedAt&token=${process.env.NEWS_API_KEY}`;
} else {
  url = `https://gnews.io/api/v4/search?q=${randomCategory}&lang=en&sortby=publishedAt&token=${process.env.NEWS_API_KEY}`;
}

    const response = await axios.get(url);
    const articles = response.data.articles;

    // 3. FIND ONE NEW STORY
    let targetNews = null;
    for (const news of articles) {
      const exists = await Article.findOne({ url: news.url });
      if (!exists) {
        targetNews = news;
        break; 
      }
    }

    if (!targetNews) {
      console.log("   💤 No new articles found. Sleeping.");
      return;
    }

    // 4. GENERATE CONTENT
    console.log(`   🎯 Writing: ${targetNews.title.substring(0, 30)}...`);
    
    const prompt = `
      Write a 300-word news article for Lotus Post.
      Headline: "${targetNews.title}"
      Context: "${targetNews.description}"
      Category: ${randomCategory}
      Perspective: ${randomCategory === 'india' ? 'Local Indian Perspective' : 'Global Perspective'}
      Rules: Professional tone, no markdown.
    `;

    let content = "";
    try {
      const result = await model.generateContent(prompt);
      content = result.response.text();
      console.log(`      -> 💥 Success!`);
    } catch (aiError) {
      console.error(`      -> ⚠️ AI Quota Hit. Using standard description.`);
      content = targetNews.description; 
    }

    const newArticle = await Article.create({
      title: targetNews.title,
      description: targetNews.description,
      content: content,
      url: targetNews.url,
      image: targetNews.image,
      source: 'Lotus Post',
      category: randomCategory,
      publishedAt: targetNews.publishedAt,
    });
    console.log(`      ✅ Saved to DB.`);

    // 📧 5. NOTIFICATION LOGIC (UPDATED)
    // Only send if content is substantial
    if (content.length > 200) { 
        console.log("      📨 Preparing to send News Alerts...");
        
        // 🟢 FIX: Fetch ALL subscribers (Removed {isVerified: true})
        const subscribers = await Subscriber.find({});
        
        if (subscribers.length > 0) {
            console.log(`      📨 Sending to ${subscribers.length} users...`);
            
            // Loop through all users and send email
            for (const sub of subscribers) {
                try {
                    await transporter.sendMail({
                        from: `"Lotus Post Team" <${process.env.EMAIL_USER}>`,
                        to: sub.email,
                        subject: `Breaking: ${newArticle.title}`,
                        html: `
                          <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #2563EB;">${newArticle.title}</h2>
                            <p style="font-size: 16px;">${newArticle.description}</p>
                            <br/>
                            <a href="http://localhost:3000" style="background:#2563EB;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Read Full Story</a>
                            <br/><br/>
                            <hr style="border:0; border-top:1px solid #eee;">
                            <small style="color:#888;">You are receiving this because you subscribed to Lotus Post.</small>
                          </div>
                        `
                    });
                    console.log(`         -> Sent to ${sub.email}`);
                } catch (err) {
                    console.error(`         -> Failed to send to ${sub.email}: ${err.message}`);
                }
            }
        } else {
            console.log("      ⚠️ No subscribers found in database.");
        }
    }

  } catch (error) {
    console.error(`❌ Worker Error:`, error.message);
  }
};

module.exports = fetchNews;