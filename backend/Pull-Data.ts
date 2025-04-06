import dotenv from 'dotenv';
dotenv.config();

import { NEWS_API_KEY_ENV_VAR, OPEN_AI_KEY, NEWSCATEGORIES } from './constants.ts';
import NewsAPI from 'newsapi';
import OpenAI from 'openai';

const apiKey = process.env[NEWS_API_KEY_ENV_VAR];
const openAiKey = process.env[OPEN_AI_KEY];

if (!apiKey) {
  throw new Error(`Missing ${NEWS_API_KEY_ENV_VAR} environment variable`);
}
if (!openAiKey) {
  throw new Error(`Missing ${OPEN_AI_KEY} environment variable`);
}

const newsapi = new NewsAPI(apiKey);
const openaiclient = new OpenAI({ apiKey: openAiKey });

export async function fetchTopHeadlines(date?: string) {
  try {
    const params: any = {
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 10,
      page: 1,
      q: 'news',
    };

    if (date) {
      const from = new Date(date);
      const to = new Date(date);
      to.setUTCHours(23, 59, 59, 999);

      params.from = from.toISOString();
      params.to = to.toISOString();
    }

    const response = await newsapi.v2.everything(params);
    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export async function analyzeHeadlinesForInvestment(date?: string) {
  const headlinesResponse = await fetchTopHeadlines(date);
  const articles = headlinesResponse.articles;

  if (!articles || articles.length === 0) {
    return 'No articles found for the specified date.';
  }

  const articleInfo = articles.map(a => {
    return `Title: ${a.title}
  URL: ${a.url}
  Image: ${a.urlToImage}
  Published At: ${a.publishedAt}`;
  }).join('\n---\n');

  const systemPrompt = `
  You are a financial analyst. Given a list of news articles (title, URL, image, and published date), do the following:
  1. Categorize each article into one of the following categories: ${NEWSCATEGORIES.join(', ')}.
  2. Provide a one-sentence investment insight for each.
  3. Suggest 1–2 relevant stock tickers based on the article.
  4. Include the article's title, URL, image, and publishedAt date in the output.
  
  Return the result as an array of JSON objects like:
  [
    {
      "category": "Technology",
      "title": "Example Title",
      "url": "https://...",
      "image": "https://...",
      "publishedAt": "2025-04-05T14:30:00Z",
      "insight": "This is the investment insight.",
      "tickers": ["AAPL", "MSFT"]
    }
  ]
  `;

  const chatResponse = await openaiclient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: articleInfo }
    ]
  });

  return chatResponse.choices[0].message.content;
}



