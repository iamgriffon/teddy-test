import { Test, TestingModule } from '@nestjs/testing'
import { ClientController } from '../application/controllers/client.controller'
import { ClientService } from '../application/services/client.service'
import { ClientRepositoryProvider } from '../db/repository/client.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientEntity } from '../db/entities/client.entity'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { ErrorClientDTO, DeleteClientDTO, GetClientsDTO } from '@/core'
import { UpdateResult } from 'typeorm'
import { HttpException } from '@nestjs/common'
describe('ClientController', () => {
  let clientController: ClientController
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
          logging: false
        })
      ],
      controllers: [ClientController],
      providers: [ClientService, ClientRepositoryProvider]
    }).compile()
    clientController = app.get<ClientController>(ClientController)
  })
  describe('Create Client', () => {
    beforeEach(async () => {
      await clientController.wipeAll()
    })
    it('should create a new client', async () => {
      const client = new ClientEntity()
      client.name = faker.person.fullName()
      client.company_sallary = faker.number.int({ min: 10000, max: 150000 })
      client.sallary = faker.number.int({ min: 5000, max: 100000 })
      const response = await clientController.create(client)
      expect(response).toBeDefined()
    })
    it('should write many clients at once', async () => {
      const clients = await clientController.seedClients(10)
      expect(clients).toBeDefined()
      expect(clients.length).toBeGreaterThanOrEqual(10)
      await clientController.wipeAll()
    })
    
    it('should return the created client as the first element of the array (LIFO)', async () => {
      const client = new ClientEntity()
      client.name = 'Teste'
      client.company_sallary = 10000
      client.sallary = 5000
      await clientController.create(client)
      const response = await clientController.findMany('1', '1')
      expect(response).toBeDefined()
      if (!!response.clients) {
        expect(response.clients[0].name).toBe('Teste')
        expect(response.clients[0].company_sallary).toBe(10000)
        expect(response.clients[0].sallary).toBe(5000)
      }
    })
    it('should throw an error if the client is not valid', async () => {
      const client = new ClientEntity()
      client.name = ''
      client.company_sallary = 0
      client.sallary = 0
      await expect(clientController.create(client)).rejects.toThrow(HttpException)
    })
  })
  describe('Read Client', () => {
    beforeEach(async () => {
      await clientController.wipeAll()
      const client = new ClientEntity()
      client.name = 'teste'
      client.company_sallary = 10000
      client.sallary = 5000
      await clientController.create(client)
    })
    it('should find a client by id', async () => {
      const response = await clientController.findById(1)
      expect(response).toBeDefined()
      if (response) {
        expect(response.name).toBe('teste')
        expect(response.company_sallary).toBe(10000)
        expect(response.sallary).toBe(5000)
      }
    })
    it('should find all clients', async () => {
      await clientController.seedClients(10)
      const response = await clientController.findMany('1', '3')
      expect(response).toBeDefined()
      expect(response.clients).toBeInstanceOf(Array)
      expect(response.clients.length).toBeGreaterThanOrEqual(3)
      expect(response.total).toBeGreaterThanOrEqual(10)
      expect(response.page).toBe(1)
      expect(response.total_pages).toBe(4)
    })
    it('should return null if the client is not found', async () => {
      await expect(clientController.findById(255)).rejects.toThrow(HttpException)
    })
  })
  describe('Update Client', () => {
    beforeAll(async () => {
      // Changed to beforeAll to ensure client exists for all tests in this describe block
      await clientController.wipeAll()
      const client = new ClientEntity()
      client.name = 'teste'
      client.company_sallary = 10000
      client.sallary = 5000
      await clientController.create(client)
    })
    it('should update a client', async () => {
      const response = await clientController.update(1, {
        name: 'teste2',
        company_sallary: 15000,
        sallary: 7000,
        id: 1
      })
      expect(response).toBeDefined()
      if (response) {
        expect(response).toBeInstanceOf(UpdateResult)
      }
    })
    it('should return an empty update result if the client is not found', async () => {
      await expect(clientController.update(255, {
        name: 'teste2',
        company_sallary: 15000,
        sallary: 7000,
        id: 1
      })).rejects.toThrow(HttpException)
    })
    afterAll(async () => {
      await clientController.wipeAll()
    })
  })
  describe('Delete Client', () => {
    beforeAll(async () => {
      // Changed to beforeAll
      await clientController.wipeAll()
      const client = new ClientEntity()
      client.name = 'teste'
      client.company_sallary = 10000
      client.sallary = 5000
      await clientController.create(client)
    })
    it('should delete a client', async () => {
      const user = await clientController.findById(1)
      if (user) {
        const response = await clientController.delete(1)
        expect(response).toBeDefined()
      }
    })
    it('should throw an error if the client is not found', async () => {
      await expect(clientController.delete(255)).rejects.toThrow(HttpException)
    })
  })
  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const connection = clientController['clientService']['clientRepository'].manager.connection;
    if (connection.isConnected) {
      await connection.close();
    }
  })
})
