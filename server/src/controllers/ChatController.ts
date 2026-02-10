import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services/ChatService';

export class ChatController {
  constructor(private chatService: ChatService) {}

  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { channelId } = req.params;
      const { limit } = req.query;
      const messages = await this.chatService.getMessages(
        channelId,
        limit ? parseInt(limit as string) : 50
      );
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      next(error);
    }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await this.chatService.sendMessage(req.body);
      res.status(201).json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;
      const success = await this.chatService.deleteMessage(messageId);
      res.status(200).json({ success, message: 'Message deleted' });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.chatService.getUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }
}
