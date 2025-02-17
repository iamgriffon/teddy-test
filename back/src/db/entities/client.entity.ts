import { IsNumber, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 255)
  name: string;

  @Column()
  @IsNumber()
  sallary: number;

  @Column()
  @IsNumber()
  company_sallary: number;
}