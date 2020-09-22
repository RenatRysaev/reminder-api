import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
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
