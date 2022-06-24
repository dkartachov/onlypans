import express, { Router } from 'express';
import posts from './routes/posts.js';
import auth from './routes/auth.js';
import login from './routes/login.js';

const app = express();
const router = Router();
const port = process.env.PORT;

const endpointHit = (req, res, next) => {
  console.log(`${req.originalUrl} endpoint hit`);
  next();
}

router.use('/posts', posts);
router.use('/login', login);

app.use(express.json());
app.use('/api/v1', (req, res, next) => {
  console.log(`${req.originalUrl} endpoint hit`);
  next();
}, router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
