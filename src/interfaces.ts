export interface User {
  nome: string
  idade: number
  email: string
}

export interface UpdateUser {
  nomeQuery: string;
  nome?: string
  idade?: number
}