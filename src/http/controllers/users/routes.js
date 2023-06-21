import Router from "koa-router"

const router = new Router({prefix: "/users"})

router.get('/', async ctx => {
  ctx.body = 'test'
})

export default router