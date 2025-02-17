import { ClientEntity } from '../../db/entities/client.entity';
import { ClientRepository } from '../../db/repository/client.repository';
import { ClientDTO } from '../../core/dtos';
import { DeleteResult, FindManyOptions, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService implements IClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findAll(): Promise<ClientDTO[]> {
    return this.clientRepository.findAll();
  }

  async findById(id: number): Promise<ClientDTO | null> {
    return this.clientRepository.findById(id);
  }

  async findMany(options: FindManyOptions<ClientEntity>): Promise<ClientDTO[]> {
    return this.clientRepository.findMany(options);
  }

  async createClient(client: ClientEntity): Promise<ClientDTO> {
    const newClient = await this.clientRepository.createClient(client);
    return newClient;
  }

  async updateClient(id: number, client: ClientEntity): Promise<UpdateResult> {
    return this.clientRepository.update(id, client);
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    return this.clientRepository.delete(id);
  }

  async createMany(count: number): Promise<void> {
    return await this.clientRepository.createMany(count);
  }

  async wipe(): Promise<void> {
    return await this.clientRepository.wipe();
  }
}

export interface IClientService {
  findAll(): Promise<ClientDTO[]>;
  findById(id: number): Promise<NullableClientDTO>;
  createClient(client: ClientEntity): Promise<ClientDTO>;
  findMany(options: FindManyOptions<ClientEntity>): Promise<ClientDTO[]>;
  updateClient(id: number, client: ClientEntity): Promise<UpdateResult>;
  deleteClient(id: number): Promise<DeleteResult>;
  createMany(count: number): Promise<void>;
}

export type NullableClientDTO = ClientDTO | null;