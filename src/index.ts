import Koa from 'koa'
import userRoutes from './http/controllers/users/routes'
import { env } from './env/index';
import { AppDataSource } from './data-source';
import bodyParser from 'koa-bodyparser';

const koa = new Koa();

koa.use(bodyParser());
koa.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});
koa.use(userRoutes.routes())

const app = koa.listen(env.PORT);

AppDataSource.initialize().then(() => {
  console.log("Conectado ao banco!")
  

}).catch(err => console.log("Não conectou ao banco",err))

export default app