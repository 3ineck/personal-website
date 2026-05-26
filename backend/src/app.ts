import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { healthRouter } from './routes/health.routes.js';
import { cvRouter } from './routes/cv.routes.js';
import { contactRouter } from './routes/contact.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  if (!env.isProduction) {
    app.use(cors({ origin: 'http://localhost:5173' }));
  }

  app.use(express.json());

  app.use('/api/health', healthRouter);
  app.use('/api/cv', cvRouter);
  app.use('/api/contact', contactRouter);

  if (env.isProduction) {
    const frontendDist = path.resolve(__dirname, '../../frontend/dist');
    app.use(express.static(frontendDist));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(frontendDist, 'index.html'));
    });
  }

  app.use(errorHandler);

  return app;
}
