import Router from "koa-router"
import { ZodError, z } from "zod"
import { createUser } from "./createUser"
import { listUsers } from "./listUsers"
import { deleteUser } from "./deleteUser"
import { findUser } from "./findUser"
import { updateUser } from "./updateUser"
// import { userRepository } from "../../../repositories/UsersRepository"

const router = new Router()

router.get('/', async ctx => {
  ctx.response.status = 200
})

router.get('/users', listUsers)
router.post('/user', createUser)
router.delete('/user/:nome', deleteUser)
router.get('/user/:nome', findUser)
router.patch('/user/:nome', updateUser)

export default router