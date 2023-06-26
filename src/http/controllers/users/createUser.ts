import { z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function createUser(ctx: Context) {
  const usersRepository = new UsersRepository()
  
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    idade: z.number().int().min(18),
  })
   ctx.request.body;

  const { nome, email, idade } = registerBodySchema.parse(ctx.request.body)
  try {
    const user = await usersRepository.create({nome, email, idade})

    ctx.response.status = 201
    ctx.response.body = user

  } catch (err) {
    console.log(err)
    throw err
  }
}
