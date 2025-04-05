import dotenv from 'dotenv';
dotenv.config();
import { NEWS_API_KEY_ENV_VAR } from './constants.ts';

const apiKey = process.env[NEWS_API_KEY_ENV_VAR];
if (!apiKey) {
  throw new Error(`Missing ${NEWS_API_KEY_ENV_VAR} environment variable`);
}
import NewsAPI from 'newsapi';
const newsapi = new NewsAPI(apiKey);


export async function fetchTopHeadlines(category:string) {
  try {
    const response = await newsapi.v2.topHeadlines({
      country: 'us',
      category: 'technology',
      language: 'en',
     pageSize: 5
    });
    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

