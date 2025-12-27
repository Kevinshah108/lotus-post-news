require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testConnection() {
  console.log("🔍 Testing API Key permissions...");
  
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ No API Key found in .env file!");
    return;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Try the most basic model first to see the REAL error
  const modelName = "gemini-1.5-flash";
  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    console.log(`👉 Attempting to generate with '${modelName}'...`);
    const result = await model.generateContent("Say hello.");
    console.log("✅ SUCCESS! The model works.");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("\n❌ ERROR DETAILS:");
    console.error("------------------------------------------------");
    console.error("Message:", error.message);
    
    if (error.message.includes("API key not valid")) {
      console.log("💡 TIP: Your API Key is wrong. Generate a new one at aistudio.google.com");
    } else if (error.message.includes("404")) {
      console.log("💡 TIP: The model name is wrong or your region is blocked.");
    } else {
      console.log("💡 TIP: Check your internet connection or quota.");
    }
    console.error("------------------------------------------------");
  }
}

testConnection();