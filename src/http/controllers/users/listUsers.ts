import { z } from "zod";
import UsersRepository from "../../../repositories/users/UsersRepository"
import { Context } from "koa";

export async function listUsers(ctx: Context) {
  const usersRepository = new UsersRepository()
  
  try {
    const users = await usersRepository.all()
    if(users.length === 0) {
      ctx.response.body = []
      ctx.response.status = 200
      return
    }
    ctx.response.body = {users}

  } catch (err) {
    if (err) {
      console.log(err)
    }
    throw err
  }
}
