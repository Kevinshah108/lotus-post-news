const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: String, // <--- NEW FIELD for the full AI story
  url: { type: String, required: true, unique: true },
  image: String,
  source: String,
  category: String,
  publishedAt: Date,
}, { timestamps: true });

// AUTOMATION TRICK: Delete articles older than 48 hours automatically
articleSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

module.exports = mongoose.model('Article', articleSchema);