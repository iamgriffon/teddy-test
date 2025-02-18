import { IsDate, IsNumber, IsString, Length, Min } from 'class-validator';
import { DeleteResult, UpdateResult } from 'typeorm';

export class ClientDTO {
  @IsNumber()
  @Min(0, { message: 'Id must be greater than 0' })
  id: number;

  @IsString()
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'Sallary must be greater than 0' })
  sallary: number;

  @IsNumber()
  @Min(0, { message: 'Company sallary must be greater than 0' })
  company_sallary: number;

  @IsDate()
  created_at?: Date;

  @IsDate()
  updated_at?: Date;
}

export type GetClientsDTO = {
  clients: ClientDTO[];
  total: number;
  page: number;
  total_pages: number;
};

export type UpdateClientDTO = UpdateResult;

export type DeleteClientDTO = { message: string, raw: DeleteResult, affected: number };

export type CreateClientDTO = ClientDTO;

export type ErrorClientDTO = { error: string, status: number };