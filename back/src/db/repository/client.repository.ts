import { ClientEntity } from '../../db/entities/client.entity'
import { ClientDTO } from '../../core/dtos'
import {
  DataSource,
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult
} from 'typeorm'
import { faker } from '@faker-js/faker'

export class ClientRepository extends Repository<ClientEntity> {
  constructor(private dataSource: DataSource) {
    super(ClientEntity, dataSource.createEntityManager())
  }

  async findAll(): Promise<ClientDTO[]> {
    return this.find()
  }

  async findMany(options: FindManyOptions<ClientEntity>): Promise<ClientDTO[]> {
    return this.createQueryBuilder('client')
      .orderBy('client.created_at', 'DESC')
      .skip(options.skip)
      .take(options.take)
      .getMany()
  }

  async findById(id: number): Promise<ClientDTO | null> {
    return this.findOneBy({ id })
  }

  async createClient(client?: DeepPartial<ClientEntity>): Promise<ClientDTO> {
    if (!client) {
      throw new Error('Client is required')
    }
    const result = await this.save(client)
    return result
  }

  async updateClient(
    id: number,
    client: DeepPartial<ClientDTO>
  ): Promise<UpdateResult> {
    return this.createQueryBuilder('client')
      .update()
      .set(client)
      .where('id = :id', { id })
      .execute()
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    return this.delete(id)
  }

  async createMany(count: number): Promise<void> {
    const clients: ClientEntity[] = []
    for (let i = 0; i < count; i++) {
      const client = new ClientEntity()
      client.name = faker.person.fullName()
      client.sallary = faker.number.int({ min: 500000, max: 10000000 })
      client.company_sallary = faker.number.int({ min: 1000000, max: 10000000 })
      client.created_at = faker.date.recent()
      clients.push(client)
    }
    await this.save(clients)
  }

  async wipe(): Promise<void> {
    await this.clear()
    await this.query(`ALTER SEQUENCE clients_id_seq RESTART WITH 1;`)
  }

  async findRecent(limit: number): Promise<ClientDTO[]> {
    return this.createQueryBuilder('client')
      .orderBy('client.created_at', 'DESC')
      .take(limit)
      .getMany()
  }
}

export interface IClientRepository {
  findAll(): Promise<ClientDTO[]>
  findMany(options: FindManyOptions<ClientEntity>): Promise<ClientDTO[]>
  findById(id: number): Promise<ClientDTO | null>
  createClient(client?: DeepPartial<ClientEntity>): Promise<ClientDTO>
  updateClient(
    id: number,
    client: DeepPartial<ClientDTO>
  ): Promise<UpdateResult>
  deleteClient(id: number): Promise<DeleteResult>
  populateClients(count: number): Promise<void>
  wipe(): Promise<void>
}

export const ClientRepositoryProvider = {
  provide: ClientRepository,
  useFactory: (dataSource: DataSource) => new ClientRepository(dataSource),
  inject: [DataSource]
}
