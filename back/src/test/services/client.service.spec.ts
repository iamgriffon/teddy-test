import { Test } from '@nestjs/testing'
import { ClientService } from '@/application/services/client.service'
import { ClientRepository } from '@/db/repository/client.repository'
import { ClientEntity } from '@/db/entities/client.entity'
import { GetClientsDTO } from '@/core/dtos'
import { HttpException } from '@nestjs/common'

const mockClientRepository = () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findMany: jest.fn(),
  createClient: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  wipe: jest.fn(),
  count: jest.fn()
})

describe('ClientService', () => {
  let service: ClientService
  let repository: any

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ClientService,
        { provide: ClientRepository, useFactory: mockClientRepository }
      ]
    }).compile()

    service = module.get<ClientService>(ClientService)
    repository = module.get<ClientRepository>(ClientRepository)
  })

  describe('findAll', () => {
    it('should return all clients', async () => {
      const mockClients = [new ClientEntity(), new ClientEntity()]
      repository.findAll.mockResolvedValue(mockClients)

      const result = await service.findAll()
      expect(result).toEqual(mockClients)
      expect(repository.findAll).toHaveBeenCalled()
    })
  })

  describe('findById', () => {
    it('should return a client by ID', async () => {
      const mockClient = new ClientEntity()
      repository.findById.mockResolvedValue(mockClient)

      const result = await service.findById(1)
      expect(result).toEqual(mockClient)
      expect(repository.findById).toHaveBeenCalledWith(1)
    })

    it('should return null if client not found', async () => {
      repository.findById.mockResolvedValue(null)
      const result = await service.findById(999)
      expect(result).toBeNull()
    })
  })

  describe('findMany', () => {
    it('should return paginated results', async () => {
      const mockClients = [new ClientEntity(), new ClientEntity()]
      repository.findMany.mockResolvedValue(mockClients)
      repository.count.mockResolvedValue(10)

      const options = { skip: 0, take: 2 }
      const result: GetClientsDTO = await service.findMany(options)

      expect(result.clients).toHaveLength(2)
      expect(result.total).toBe(10)
      expect(result.page).toBe(1)
      expect(result.total_pages).toBe(5)
    })
  })

  describe('createClient', () => {
    it('should create a new client', async () => {
      const mockClient = new ClientEntity()
      repository.createClient.mockResolvedValue(mockClient)

      const result = await service.createClient(mockClient)
      expect(result).toEqual(mockClient)
      expect(repository.createClient).toHaveBeenCalledWith(mockClient)
    })
  })

  describe('wipe', () => {
    it('should wipe all clients', async () => {
      repository.wipe.mockResolvedValue(undefined)
      await expect(service.wipe()).resolves.not.toThrow()
    })

    it('should throw on wipe failure', async () => {
      repository.wipe.mockRejectedValue(new Error())
      await expect(service.wipe()).rejects.toThrow(HttpException)
    })
  })
})
