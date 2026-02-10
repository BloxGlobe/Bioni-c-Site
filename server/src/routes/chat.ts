import { Router, type Request, type Response, type NextFunction } from 'express';
import { chatController } from '../config/wire';

const router = Router();

router.get('/channels/:channelId/messages', (req: Request, res: Response, next: NextFunction) =>
  chatController.getMessages(req, res, next)
);

router.post('/channels/:channelId/messages', (req: Request, res: Response, next: NextFunction) =>
  chatController.sendMessage(req, res, next)
);

router.delete('/messages/:messageId', (req: Request, res: Response, next: NextFunction) =>
  chatController.deleteMessage(req, res, next)
);

router.get('/channels/:channelId/users', (req: Request, res: Response, next: NextFunction) =>
  chatController.getUsers(req, res, next)
);

export default router;
