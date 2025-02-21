import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MinLength
} from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @Column()
  @IsEmail()
  @Unique(['email'])
  email: string

  @Column()
  @IsNotEmpty()
  password: string

  @Column('integer', { array: true, nullable: true })
  @IsArray()
  @IsNumber({}, { each: true })
  selected_clients: number[]
}
