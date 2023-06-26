
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { UpdateUser, User as UserInterface } from '../../interfaces';
import { User } from '../../entities/User';
import UsersRepositoryInterface from './UsersRepositoryInterface';

export default class UsersRepository implements UsersRepositoryInterface {
  repository: Repository<User>;
  
  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async all(): Promise<User[]> {
    return this.repository.find()
  }

  async find(nome: string | undefined) {
    return await this.repository.findOneBy({nome})
  }

  async create(data: UserInterface): Promise<User> {
    const userAlreadyExists = await this.repository.findOneBy({email : data.email})
    if(userAlreadyExists) {
      throw new Error("User already exists")
    }
    const user = this.repository.create(data)
    await this.repository.save(user)
    return user
  }

  async delete(nome: string): Promise<any> {
    const user = await this.repository.findOneBy({nome})
    if(user) {
       await this.repository.delete(user)
       return user
    } else {
      throw new Error("User not found")
    }
  }

  async update({nomeQuery, nome, idade}:UpdateUser): Promise<any> {
    let user = await this.find(nomeQuery)

    if(!user) {
      throw new Error('User not found')
    }
    if(nome) {
      user.nome = nome
    }
    if(idade) {
      user.idade = idade
    }
    await this.repository.save(user)
    return user
  }
}

