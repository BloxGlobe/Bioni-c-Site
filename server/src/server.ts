import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/dashboard';
import chatRoutes from './routes/chat';
import userRoutes from './routes/user';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// ============= MIDDLEWARE =============
app.use(cors() as any);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ============= ROUTES =============
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============= ERROR HANDLING =============
app.use(errorHandler);

// ============= SERVER STARTUP =============
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
