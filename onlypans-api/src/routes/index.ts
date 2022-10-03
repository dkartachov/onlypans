import { Router } from 'express';
import UserMidware from '../middleware/UserMidware';
import users from './users';
import posts from './posts';

const routes = Router();

routes.use('/users', users);
routes.use('/posts', posts);

export default routes;