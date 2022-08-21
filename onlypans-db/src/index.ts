import express, { Router } from 'express';
import query from './routes/query';

const port = process.env.PORT;
const app = express();
const router = Router();

app.use(
  express.json()
);

router.use('/query', query);

app.use('/v1', router);

app.listen(port, () => {
  console.log(`PansDB listening on port ${port}...`);
});