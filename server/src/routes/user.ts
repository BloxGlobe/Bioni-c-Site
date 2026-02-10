import { Router, type Request, type Response, type NextFunction } from 'express';
import { userController } from '../config/wire';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  userController.getAllUsers(req, res, next)
);

router.get('/:userId', (req: Request, res: Response, next: NextFunction) =>
  userController.getUserById(req, res, next)
);

router.post('/', (req: Request, res: Response, next: NextFunction) =>
  userController.createUser(req, res, next)
);

router.put('/:userId', (req: Request, res: Response, next: NextFunction) =>
  userController.updateUser(req, res, next)
);

router.delete('/:userId', (req: Request, res: Response, next: NextFunction) =>
  userController.deleteUser(req, res, next)
);

export default router;
