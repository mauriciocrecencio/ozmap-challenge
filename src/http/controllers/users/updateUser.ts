import { ZodError, z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function updateUser(ctx: Context) {
  const usersRepository = new UsersRepository()

  const registerBodySchema = z.object({
    nome: z.string(),
    idade: z.number().min(18),
  })
  try {
    const nomeQuery = ctx.params.nome
    const { nome, idade } = registerBodySchema.parse(ctx.request.body)

    const user = await usersRepository.update({nomeQuery, nome, idade})
    ctx.response.body = user

  } catch (err) {
    ctx.response.status = 400
    if(err instanceof ZodError) {
      ctx.response.body = err.issues
      return
    }
    // @ts-ignore
    ctx.response.body = {message: err.message}
    return
  }
}
