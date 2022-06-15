import express, { Router } from 'express';
import posts from './routes/posts.js';

const app = express();
const router = Router();
const port = process.env.PORT;

router.use('/posts', posts);

router.get('/', async (req, res) => {
  res.status(200).json({
    api: {
      name: 'onlypans-api',
      status: 'healthy',
      version: '1.0.0',
    },
    routes: [
      {
        endpoint: '/posts',
      },
    ]
  });
});

app.use(express.json());

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
