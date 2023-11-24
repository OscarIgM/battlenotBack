import express from 'express';
import userRouter from './src/routes/users.router.js';
import authRouter from './src/routes/auth.router.js';
import { PORT } from './src/config/environment.js';
import connectDB from './src/config/mongo.js';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);

async function startServer() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startServer();
