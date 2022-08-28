import express, { Router } from 'express';
import EndpointMidware from './middleware/EndpointMidware';
import AuthMidware from './middleware/AuthMidware';
import routes from './routes';

const port = process.env.PORT ?? 0;
const app = express();

app.use(
  express.json()
);

app.use('/v1', [AuthMidware, EndpointMidware], routes);

app.listen(port, () => {
  console.log(`PansAPI listening on port ${port}...`)
});