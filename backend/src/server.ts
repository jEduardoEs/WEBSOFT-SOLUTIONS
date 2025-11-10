import express from 'express';
import cors from 'cors';
import { config } from './config';
import authRouter from './routes/auth';

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());

app.use('/auth', authRouter);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.listen(config.port, () => {
  console.log(`API listening on port ${config.port}`);
});
