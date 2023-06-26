import { z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function deleteUser(ctx: Context) {
  const usersRepository = new UsersRepository()
  
  const registerBodySchema = z.object({
    nome: z.string(),
  })
  const { nome } = registerBodySchema.parse(ctx.params)

  try {
    if(!(await usersRepository.find(nome))) {
      return new Error('User not exist')
    }
    const user = await usersRepository.delete(nome)
    ctx.response.body = user

  } catch (err) {
    console.log(err)
    throw err
  }
}
