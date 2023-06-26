
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
    const user = this.repository.create(data)
    await this.repository.save(user)
    return user
  }

  // TODO: Typar
  async delete(nome: string): Promise<any> {
    const user = await this.repository.findOneBy({nome})
    if(user) {
       await this.repository.delete(user)
       return user
    } else {
      throw new Error("usuario não encontrado")
    }
  }

  async update({nome, newNome, newIdade}:UpdateUser): Promise<any> {
    let user = await this.find(nome)
    if(!user) {
      throw new Error('usuario nao econtrado')
    }
    if(newNome) {
      user.nome = newNome
    }
    if(newIdade) {
      user.idade = newIdade
    }
    await this.repository.save(user)
    return user
  }
}

