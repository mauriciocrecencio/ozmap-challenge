import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  nome: string

  @Column({ type: 'text' })
  email: string

  @Column({ type: 'integer' })
  idade: number
}