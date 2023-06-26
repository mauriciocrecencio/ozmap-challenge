import { ZodError, z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function createUser(ctx: Context) {
  const usersRepository = new UsersRepository()
  
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    idade: z.number().int().min(18),
  })

  try {
    const { nome, email, idade } = registerBodySchema.parse(ctx.request.body)
    const user = await usersRepository.create({nome, email, idade})

    ctx.response.status = 201
    ctx.response.body = user

  } catch (err) {
    ctx.response.status = 400
    
    if(err instanceof ZodError) {
      ctx.response.body = err.issues
      return
    }
    // @ts-ignore
    ctx.response.body = {message: err.message}
  }
}
