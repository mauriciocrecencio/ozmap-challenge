import { UpdateUser, User as UserInterface} from '../../interfaces';
import { User } from '../../entities/User';

export default interface UsersRepositoryInterface {
  all(): Promise<User[]>;
  find(nome: string | undefined): Promise<User | null>;
  create(data: UserInterface): Promise<User>;
  delete(nome: String): Promise<User>
  update({nome, newNome, newIdade}: UpdateUser): Promise<User>
}
