import { Router } from 'express';
import Login from './Login';
import Posts from './Posts';

const publicRoutes = Router();
const secureRoutes = Router();

// public routes - authentication not required
publicRoutes.use('/login', Login);

// secure routes - authentication required
secureRoutes.use('/posts', Posts);

export {
  publicRoutes,
  secureRoutes
}