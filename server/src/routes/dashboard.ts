import { Router, type Request, type Response, type NextFunction } from 'express';
import { dashboardController } from '../config/wire';

const router = Router();

router.get('/servers', (req: Request, res: Response, next: NextFunction) =>
  dashboardController.getServers(req, res, next)
);

router.get('/servers/:serverId/categories', (req: Request, res: Response, next: NextFunction) =>
  dashboardController.getCategories(req, res, next)
);

router.get('/categories/:categoryId/channels', (req: Request, res: Response, next: NextFunction) =>
  dashboardController.getChannels(req, res, next)
);

router.post('/servers', (req: Request, res: Response, next: NextFunction) =>
  dashboardController.createServer(req, res, next)
);

export default router;
