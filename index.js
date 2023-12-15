import express from 'express';
import userRouter from './src/routes/users.router.js';
import authRouter from './src/routes/auth.router.js';
import gamesRouter from './src/routes/games.router.js';
import saleRouter from './src/routes/sale.router.js';
import { PORT } from './src/config/environment.js';
import connectDB from './src/config/mongo.js';

import cors from 'cors'; 

const app = express();
app.use(cors());

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/games', gamesRouter);
app.use('/sale', saleRouter);
async function startServer() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startServer();
