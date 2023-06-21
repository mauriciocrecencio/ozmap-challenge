//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

import Koa from 'koa'
import Router from 'koa-router'
import userRoutes from './http/controllers/users/routes.js'

const koa = new Koa();
let router = new Router();

koa
  .use(userRoutes.routes())
  .use(router.routes())
  .use(router.allowedMethods());

koa.listen(PORT);
