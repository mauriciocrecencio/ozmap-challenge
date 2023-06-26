import { ZodError, z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function deleteUser(ctx: Context) {
  const usersRepository = new UsersRepository()
  
  const registerBodySchema = z.object({
    nome: z.string(),
  })
  try {
    const { nome } = registerBodySchema.parse(ctx.params)

    if(!(await usersRepository.find(nome))) {
      ctx.response.status = 404
      ctx.response.body = {message: "User not found"}
      return
    }
    const user = await usersRepository.delete(nome)
    ctx.response.body = user

  } catch (err) {
    if(err instanceof ZodError) {
      ctx.response.status = 400
      ctx.response.body = err.issues
      return
    }
    console.log(err)
    throw err
  }
}
