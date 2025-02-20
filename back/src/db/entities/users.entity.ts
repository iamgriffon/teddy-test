import { IsEmail, IsNotEmpty } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  @IsEmail()
  @Unique(['email'])
  email: string

  @Column()
  @IsNotEmpty()
  password: string
}
