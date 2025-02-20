import { IsDate, IsNumber, Length, IsNotEmpty, Min } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(3, 255)
  @IsNotEmpty()
  name: string

  @Column({ type: 'bigint', nullable: true })
  @IsNumber()
  @Min(0)
  sallary: number

  @Column({ type: 'bigint', nullable: true })
  @IsNumber()
  @Min(0)
  company_sallary: number

  @Column({ nullable: true })
  @IsDate()
  created_at?: Date

  @Column({ nullable: true })
  @IsDate()
  updated_at?: Date
}
