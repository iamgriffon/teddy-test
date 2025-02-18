import { ClientEntity } from '../../db/entities/client.entity';
import { ClientDTO } from '../../core/dtos';
import {
  DataSource,
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { faker } from '@faker-js/faker';

export class ClientRepository extends Repository<ClientEntity> {
  constructor(private dataSource: DataSource) {
    super(ClientEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<ClientDTO[]> {
    return this.find();
  }

  async findMany(options: FindManyOptions<ClientEntity>): Promise<ClientDTO[]> {
    return this.find(options);
  }

  async findById(id: number): Promise<ClientDTO | null> {
    return this.findOneBy({ id });
  }

  async createClient(client?: DeepPartial<ClientEntity>): Promise<ClientDTO> {
    if (!client) {
      throw new Error('Client is required');
    }
    const result = await this.save(client);
    return result;
  }

  async update(
    id: number,
    client: DeepPartial<ClientDTO>,
  ): Promise<UpdateResult> {
    return super.update(id, client);
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }

  async createMany(count: number): Promise<void> {
    let clients: ClientEntity[] = [];
    for (let i = 0; i < count; i++) {
      const client = new ClientEntity();
      client.name = faker.person.fullName();
      client.sallary = faker.number.int({ min: 5000, max: 100000 });
      client.company_sallary = faker.number.int({ min: 10000, max: 100000 });
      clients.push(client);
    }
    await Promise.all(clients.map((client) => this.save(client)));
  }

  async wipe(): Promise<void> {
    await this.clear();
    await this.query(`ALTER SEQUENCE clients_id_seq RESTART WITH 1;`);
    await this.query(`COMMIT;`);
  }
}

export interface IClientRepository {
  findAll(): Promise<ClientDTO[]>;
  findMany(options: FindManyOptions<ClientEntity>): Promise<ClientDTO[]>;
  findById(id: number): Promise<ClientDTO | null>;
  createClient(client?: DeepPartial<ClientEntity>): Promise<ClientDTO>;
  updateClient(
    id: number,
    client: DeepPartial<ClientDTO>,
  ): Promise<UpdateResult>;
  deleteClient(id: number): Promise<DeleteResult>;
  populateClients(count: number): Promise<void>;
  wipe(): Promise<void>;
}

export const ClientRepositoryProvider = {
  provide: ClientRepository,
  useFactory: (dataSource: DataSource) => new ClientRepository(dataSource),
  inject: [DataSource],
};
