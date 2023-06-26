export interface User {
  nome: string
  idade: number
  email: string
}

export interface UpdateUser {
  nome: string;
  newNome?: string
  newIdade?: number
}