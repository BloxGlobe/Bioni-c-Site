import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/DashboardService';

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async getServers(req: Request, res: Response, next: NextFunction) {
    try {
      const servers = await this.dashboardService.getServers();
      res.status(200).json({ success: true, data: servers });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.dashboardService.getCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  }

  async getChannels(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const channels = await this.dashboardService.getChannels(categoryId);
      res.status(200).json({ success: true, data: channels });
    } catch (error) {
      next(error);
    }
  }

  async createServer(req: Request, res: Response, next: NextFunction) {
    try {
      const server = await this.dashboardService.createServer(req.body);
      res.status(201).json({ success: true, data: server });
    } catch (error) {
      next(error);
    }
  }
}
