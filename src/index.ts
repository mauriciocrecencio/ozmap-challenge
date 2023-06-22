import Koa from 'koa'
import userRoutes from './http/controllers/users/routes'
import { env } from './env/index';
import { AppDataSource } from './data-source';


AppDataSource.initialize().then(() => {
  console.log("Conectado ao banco!")
  const koa = new Koa();
  
  koa
    .use(userRoutes.routes())
  
  koa.listen(env.PORT);

}).catch(err => console.log("Não conectou ao banco",err))