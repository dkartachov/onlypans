import express from 'express';
import login from './api/routes/login';

const port = process.env.PORT;
const app = express();

app.use(
  express.json()
);

app.use('/v1/login', login);

app.listen(port, () => {
  console.log(`PansLogin listening on port ${port}...`);
});