import { createApp } from './app';
import { config } from './config/env';
import { connectMongo } from './infrastructure/db/mongo';

(async () => {
  await connectMongo();
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
})();
