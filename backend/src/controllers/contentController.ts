import { Request, Response } from 'express';
import { contentService } from '../services/contentService';

export const contentController = {
  async getQuestions(req: Request, res: Response) {
    try {
      const mode = (req.query.mode as string) || 'default';
      const questions = await contentService.getQuestions(mode);
      return res.json(questions);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getQuote(req: Request, res: Response) {
    try {
      const quote = await contentService.getRandomQuote();
      
      if (!quote) {
        return res.status(404).json({ error: 'No quotes available' });
      }

      return res.json(quote);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};