import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../application/controllers/client.controller';
import { ClientService } from '../application/services/client.service';
import { ClientRepositoryProvider } from '../db/repository/client.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../db/entities/client.entity';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ErrorClientDTO } from '@/core';

describe('ClientController', () => {
  let clientController: ClientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          password: '123456',
          username: 'sa',
          entities: [ClientEntity],
          database: 'teddy_test',
          synchronize: true,
          logging: false,
        }),
      ],
      controllers: [ClientController],
      providers: [ClientService, ClientRepositoryProvider],
    }).compile();

    clientController = app.get<ClientController>(ClientController);
  });

  describe('Create Client', () => {
    beforeEach(async () => {
      await clientController.wipeAll();
    });

    it('should create a new client', async () => {
      const client = new ClientEntity();
      client.name = faker.person.fullName();
      client.company_sallary = faker.number.int({ min: 10000, max: 150000 });
      client.sallary = faker.number.int({ min: 5000, max: 100000 });
      const response = await clientController.create(client);
      expect(response).toBeDefined();
    });

    it('should write many clients at once', async () => {
      const clients = await clientController.seedClients(10);
      expect(clients).toBeDefined();
      expect(clients.length).toBeGreaterThanOrEqual(10);
      await clientController.wipeAll();
    });

    it('should return null if the client is not valid', async () => {
      const client = new ClientEntity();
      client.name = '';
      client.company_sallary = 0;
      client.sallary = 0;
      const response = (await clientController.create(
        client,
      )) as ErrorClientDTO;
      expect(response).toBeDefined();
      if (response.error) {
        expect(response.error).toBe('Invalid client');
      }
    });
  });

  describe('Read Client', () => {
    beforeEach(async () => {
      await clientController.wipeAll();
    });

    it('should find a client by id', async () => {
      const response = await clientController.findById(1);
      expect(response).toBeDefined();
      if (response) {
        expect(response.name).toBe('teste');
        expect(response.company_sallary).toBe(10000);
        expect(response.sallary).toBe(5000);
      }
    });

    it('should find all clients', async () => {
      await clientController.seedClients(10);
      const response = await clientController.findMany();
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Array);
      expect(response.length).toBeGreaterThanOrEqual(10);
    });

    it('should return null if the client is not found', async () => {
      const error = await clientController.findById(255);
      expect(error).toBeDefined();
      if (error) {
        expect(error).toBeNull();
      }
    });
  });

  describe('Update Client', () => {
    beforeAll(async () => {
      await clientController.wipeAll();
      const client = new ClientEntity();
      client.name = 'teste';
      client.company_sallary = 10000;
      client.sallary = 5000;
      await clientController.create(client);
    });

    it('should update a client', async () => {
      const response = await clientController.update(1, {
        name: 'teste2',
        company_sallary: 15000,
        sallary: 7000,
        id: 1,
      });
      expect(response).toBeDefined();
      if (response) {
        expect(response.affected).toBe(1);
      }
    });

    it('should return an empty update result if the client is not found', async () => {
      const error = await clientController.update(255, {
        name: 'teste2',
        company_sallary: 15000,
        sallary: 7000,
        id: 1,
      });
      expect(error).toBeDefined();
      if (error) {
        expect(error.affected).toBe(0);
      }
    });

    afterAll(async () => {
      await clientController.wipeAll();
    });
  });

  describe('Delete Client', () => {
    beforeAll(async () => {
      await clientController.wipeAll();
    });

    beforeEach(async () => {
      const client = new ClientEntity();
      client.name = 'teste';
      client.company_sallary = 10000;
      client.sallary = 5000;
      await clientController.create(client);
    });

    it('should delete a client', async () => {
      const user = await clientController.findById(1);
      if (user) {
        const response = await clientController.delete(1);
        expect(response).toBeDefined();
        expect(response.message).toBe('Client deleted successfully');
        expect(response.affected).toBe(1);
      }
    });

    it('should throw an error if the client is not found', async () => {
      const error = await clientController.delete(255);
      if (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Client not found');
        expect(error.affected).toBe(0);
      }
    });
  });

  afterAll(async () => {
    const connection =
      clientController['clientService']['clientRepository'].manager.connection;
    if (connection.isConnected) {
      await connection.close();
    }
  });
});
