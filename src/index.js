import Koa from 'koa'
import userRoutes from './http/controllers/users/routes.js'
import { env } from './env/index.js';

const koa = new Koa();

koa
  .use(userRoutes.routes())

koa.listen(env.PORT);
