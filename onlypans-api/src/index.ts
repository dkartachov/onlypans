import express, { Router } from 'express';
import EndpointMidware from './middleware/EndpointMidware';
import AuthMidware from './middleware/AuthMidware';
import { publicRoutes, secureRoutes } from './routes';

const port = process.env.PORT ?? 0;
const app = express();

app.use(
  express.json()
);

app.use('/v1', EndpointMidware, publicRoutes);
app.use('/v1', EndpointMidware, AuthMidware, secureRoutes);

app.listen(port, () => {
  console.log(`PansAPI listening on port ${port}...`)
});