/**
 * Wire/Dependency Injection Configuration
 * Centralized setup for all services and their dependencies
 */

import { DashboardService } from '../services/DashboardService';
import { ChatService } from '../services/ChatService';
import { UserService } from '../services/UserService';
import { DashboardController } from '../controllers/DashboardController';
import { ChatController } from '../controllers/ChatController';
import { UserController } from '../controllers/UserController';

// ============= SERVICES =============
const dashboardService = new DashboardService();
const chatService = new ChatService();
const userService = new UserService();

// ============= CONTROLLERS =============
const dashboardController = new DashboardController(dashboardService);
const chatController = new ChatController(chatService);
const userController = new UserController(userService);

// ============= DEPENDENCY CONTAINER =============
export const container = {
  services: {
    dashboardService,
    chatService,
    userService,
  },
  controllers: {
    dashboardController,
    chatController,
    userController,
  },
};

// ============= EXPORTS =============
export {
  dashboardController,
  chatController,
  userController,
  dashboardService,
  chatService,
  userService,
};
