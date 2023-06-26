import { z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function findUser(ctx: Context) {
  const usersRepository = new UsersRepository()
  
    const registerBodySchema = z.object({
      nome: z.string(),
    })
    const { nome } = registerBodySchema.parse(ctx.params)

    try {
      const user = await usersRepository.find(nome)
      if(!user) {
        ctx.response.body = {
          message: "User not found"
        }
        ctx.response.status = 404
        return
      }
      ctx.response.body = user
      ctx.response.status = 200
  
    } catch (err) {
      console.log(err)
      throw err
    }
}
