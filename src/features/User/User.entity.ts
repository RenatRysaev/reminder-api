import { Entity, Column, PrimaryColumn } from 'typeorm'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

@Entity()
export class User implements IUser {
  @PrimaryColumn()
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string
}
