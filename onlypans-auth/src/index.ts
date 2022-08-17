import express, { Router } from 'express';
import signup from './routes/signup';
import signin from './routes/signin';
import signout from './routes/signout';

const port = process.env.PORT;
const app = express();
const router = Router();

app.use(
  express.json()
);

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/signout', signout);

app.use('/v1', router);

app.listen(port, () => {
  console.log(`onlypans-auth listening on port ${port}...`);
});