import app from './index.js';

// Vercel serverless handler
export default async function handler(req: any, res: any) {
  return app(req, res);
}
