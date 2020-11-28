import { Entity, Column, PrimaryColumn } from 'typeorm'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  refreshToken?: string
}

@Entity()
export class User implements IUser {
  @PrimaryColumn({ unique: true })
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  password: string

  @Column({ nullable: true })
  refreshToken: string
}
