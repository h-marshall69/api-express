import express, { json } from 'express'
import morgan from 'morgan'
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(cookieParser());

// routes declaration

app.use('/api', authRoutes);


// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
      status: '✅ ok',
      uptime: process.uptime(), // Current uptime of the Node.js process
      message: '🚀 API is healthy'
    });
  });

export default app;