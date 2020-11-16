import { Entity, Column, PrimaryColumn } from 'typeorm'

export interface IUser {
  id: string
  name: string
  surname: string
  email: string
  password: string
}

@Entity()
export class User implements IUser {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  email: string

  @Column()
  password: string
}
