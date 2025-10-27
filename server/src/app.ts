import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';
import config from './config';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({ 
  origin: config.cors_origin,
  credentials: true
}));

// Root health check route
app.get('/', (_req: Request, res: Response) => {
  // eslint-disable-next-line no-console
  console.log('[IMS][SERVER] Root / hit');
  res.status(200).json({
    message: '✅ Inventory Management System Backend is running...',
    status: 'Server Active',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  // eslint-disable-next-line no-console
  console.log('[IMS][SERVER] /health hit');
  res.status(200).json({
    success: true,
    message: '✅ Backend is running successfully!',
    status: 'Backend Server Operational',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// application routes
app.use('/api/v1', rootRouter);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
