import { ClientEntity } from '../../db/entities/client.entity'
import { ClientRepository } from '../../db/repository/client.repository'
import { ClientDTO, GetClientsDTO } from '../../core/dtos'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'

@Injectable()
export class ClientService implements IClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findAll(): Promise<ClientDTO[]> {
    return this.clientRepository.findAll()
  }

  async findAllIds(): Promise<number[]> {
    return this.clientRepository.getAllIds()
  }

  async findById(id: number): Promise<ClientDTO | null> {
    return this.clientRepository.findById(id)
  }

  async findMany(options: {
    skip: number
    take: number
  }): Promise<GetClientsDTO> {
    const [clients, total] = await Promise.all([
      this.clientRepository.findMany(options),
      this.clientRepository.count()
    ])

    const page = Math.floor(options.skip / options.take) + 1
    const total_pages = Math.ceil(total / options.take)

    return {
      clients,
      total,
      page,
      total_pages
    }
  }

  async create(
    clientData: Omit<ClientEntity, 'id' | 'created_at' | 'updated_at'>
  ): Promise<ClientDTO> {
    const client = new ClientEntity()
    client.name = clientData.name
    client.sallary = clientData.sallary
    client.company_sallary = clientData.company_sallary
    client.created_at = new Date()
    client.updated_at = new Date()

    const errors = await validate(client)
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST)
    }

    return this.clientRepository.createClient(client)
  }

  async updateClient(id: number, client: ClientEntity): Promise<UpdateResult> {
    const result = await this.clientRepository
      .createQueryBuilder()
      .update(ClientEntity)
      .set(client)
      .where('id = :id', { id })
      .execute()
    if (!result) {
      throw new Error('Client not found')
    }
    return result
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    return this.clientRepository.delete(id)
  }

  async createMany(count: number): Promise<void> {
    return await this.clientRepository.createMany(count)
  }

  async wipe(): Promise<void> {
    try {
      await this.clientRepository.wipe()
    } catch {
      throw new HttpException('Failed to wipe clients', HttpStatus.BAD_REQUEST)
    }
  }
}

export interface IClientService {
  findAll(): Promise<ClientDTO[]>
  findAllIds(): Promise<number[]>
  findById(id: number): Promise<NullableClientDTO>
  create(client: ClientEntity): Promise<ClientDTO>
  findMany(options: { skip: number; take: number }): Promise<GetClientsDTO>
  updateClient(id: number, client: ClientEntity): Promise<UpdateResult>
  deleteClient(id: number): Promise<DeleteResult>
  createMany(count: number): Promise<void>
}

export type NullableClientDTO = ClientDTO | null
