import { Router } from 'express';
import users from './users';
import posts from './posts';

const routes = Router();

routes.use('/users', users);
routes.use('/posts', posts);

export default routes;