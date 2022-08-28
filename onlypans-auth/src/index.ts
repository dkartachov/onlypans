import express, { Router } from 'express';
import routes from './routes';

const port = process.env.PORT;
const app = express();

app.use(
  express.json()
);

app.use('/v1', routes);

app.listen(port, () => {
  console.log(`PansAuth listening on port ${port}...`);
});