import { Response } from "express";
import { checkinService } from "../services/checkinService";
import { AuthRequest } from "../middleware/auth";

export const checkinController = {
  async createOrUpdate(req: AuthRequest, res: Response) {
    try {
      const { date, body, mind, relations, nature, mode } = req.body;
      const userId = req.userId!;

      const checkinDate = date ? new Date(date) : new Date();
      checkinDate.setHours(0, 0, 0, 0);

      const checkin = await checkinService.createOrUpdate(userId, checkinDate, {
        body,
        mind,
        relations,
        nature,
        mode,
      });

      return res.status(201).json(checkin);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getToday(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const checkin = await checkinService.getToday(userId);

      if (!checkin) {
        return res.status(404).json({ error: "No check-in for today" });
      }

      return res.json(checkin);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getHistory(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { from, to } = req.query;

      const fromDate =
        from && typeof from === "string" ? new Date(from) : undefined;
      const toDate = to && typeof to === "string" ? new Date(to) : undefined;

      const checkins = await checkinService.getHistory(
        userId,
        fromDate,
        toDate,
      );

      return res.json(checkins);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getById(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const checkin = await checkinService.getById(id, userId);

      if (!checkin) {
        return res.status(404).json({ error: "Check-in not found" });
      }

      return res.json(checkin);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};
