import { Router } from 'express';
import users from './users';
import Posts from './Posts';

const routes = Router();

routes.use('/users', users);
routes.use('/posts', Posts);

export default routes;