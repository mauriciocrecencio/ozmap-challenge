import { z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function updateUser(ctx: Context) {
  const usersRepository = new UsersRepository()
  
  const registerBodySchema = z.object({
    newNome: z.string().optional(),
    newIdade: z.number().optional(),
  })
  const nome = ctx.params.nome
  const { newNome, newIdade } = registerBodySchema.parse(ctx.request.body)

  try {
    await usersRepository.update({nome, newNome, newIdade})
    // ctx.response.body = user

  } catch (err) {
    console.log(err)
    throw err
  }
}
