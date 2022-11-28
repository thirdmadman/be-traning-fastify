import { app } from './index';
import mongoose from 'mongoose';
import { PORT, MONGODB_URI, NODE_ENV } from './common/config';

const start = async () => {
  try {
    await app.listen({ port: parseInt(PORT, 10), host: '0.0.0.0' });

    async function main() {
      await mongoose.connect(MONGODB_URI);
    }

    main().catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
};

if (NODE_ENV && NODE_ENV === 'development') {
  process.on('uncaughtException', (error) => {
    console.error(error);
  });
  process.on('unhandledRejection', (error) => {
    console.error(error);
  });
}

start();
