import express, { Router } from 'express';
import users from './routes/users.js';
import posts from './routes/posts.js';
import auth from './routes/auth.js';
import login from './routes/login.js';
import signup from './routes/signup.js'

const app = express();
const router = Router();
const port = process.env.PORT;

router.use('/users', auth, users);
router.use('/posts', auth, posts);
router.use('/login', login);
router.use('/signup', signup);

app.use(express.json());
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
