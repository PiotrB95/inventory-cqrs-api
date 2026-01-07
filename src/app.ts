import express from 'express';
import { createProductRouter } from './interfaces/http/routes/productRoutes';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use(createProductRouter());

  return app;
}
