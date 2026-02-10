import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await this.userService.updateUser(userId, req.body);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const success = await this.userService.deleteUser(userId);
      res.status(200).json({ success, message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }
}
