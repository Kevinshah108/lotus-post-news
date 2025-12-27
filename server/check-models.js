require('dotenv').config();
const axios = require('axios');

async function getAvailableModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ No API Key found in .env");
    return;
  }

  console.log("🔍 Asking Google for your specific allowed models...");
  
  try {
    // We hit the raw API endpoint directly, bypassing the SDK
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    console.log("\n✅ SUCCESS! Here are the models you can use:");
    console.log("------------------------------------------------");
    
    const models = response.data.models;
    // Filter only "generateContent" models (the ones that write text)
    const chatModels = models.filter(m => m.supportedGenerationMethods.includes("generateContent"));

    chatModels.forEach(m => {
        // We only care about the name part after "models/"
        console.log(`Model Name: "${m.name.replace('models/', '')}"`);
    });
    console.log("------------------------------------------------");
    console.log("👉 Pick one of the names above and put it in your worker.js");

  } catch (error) {
    console.error("❌ FAILED to list models.");
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

getAvailableModels();