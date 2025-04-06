import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { fetchTopHeadlines } from './Pull-Data.ts';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB setup
mongoose.connect(process.env.MONGO_URI!, {
  dbName: 'now_investments'
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(console.error);

// Define article schema
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    urlToImage: String,
    publishedAt: Date,
    description: String,
    content: String,
  
    // From OpenAI
    category: String,
    insight: String,
    tickers: [String],
  
    // Optional: when your system processed it
    analyzedAt: { type: Date, default: Date.now }
  });
const Article = mongoose.model('Article', articleSchema);

// Fetch & save daily at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('🗞 Fetching top headlines...');
  const res = await fetchTopHeadlines();

  for (const article of res.articles) {
    await Article.updateOne(
        { url: article.url },
        { ...article, analyzedAt: new Date() },
        { upsert: true }
      );
  }

  console.log('✅ Articles saved');
});

// API route to get headlines
app.get('/api/headlines', async (req, res) => {
  const articles = await Article.find().sort({ publishedAt: -1 }).limit(20);
  res.json(articles);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


//hit http://localhost:3000/api/save-headlines to trigger the save.
app.get('/api/save-headlines', async (req, res) => {
    try {
      const { date } = req.query;
  
      const response = await fetchTopHeadlines(typeof date === 'string' ? date : undefined);
      const articles = response.articles;
  
      if (!articles.length) {
        return res.status(404).send('No articles found for that date.');
      }
  
      for (const article of articles) {
        await Article.updateOne(
          { url: article.url },
          { ...article, analyzedAt: new Date() },
          { upsert: true }
        );
      }
  
      res.send(`✅ Saved ${articles.length} articles${date ? ` for ${date}` : ''}.`);
    } catch (err) {
      console.error('Error saving headlines:', err);
      res.status(500).send('❌ Failed to save headlines.');
    }
  });
