import { Test } from '@nestjs/testing'
import { HttpException, HttpStatus } from '@nestjs/common'

import { TestDatabaseModule } from '@/db/helpers/test-db-module'
import { UsersController } from '@/application/controllers/users.controller'
import { UserRepository } from '@/db/repository/user.repository'
import { UsersService } from '@/application/services/users.service'
import { UserEntity } from '@/db/entities'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '@/application/modules/auth.module'
import * as dotenv from 'dotenv'
import { AuthService } from '@/application/helpers/auth.service'
dotenv.config({ path: '.env' })

const mockUserRepository = () => ({
  findUserByEmail: jest.fn().mockImplementation((email) => {
    if (email === 'test@test.com') {
      const user = new UserEntity()
      user.id = 1
      user.email = email
      return user
    }
    return null
  }),
  save: jest.fn().mockImplementation((user) => {
    const mockUser = new UserEntity()
    mockUser.id = 1
    mockUser.name = user.name
    mockUser.email = user.email
    return Promise.resolve(mockUser)
  }),
  updateUser: jest.fn().mockResolvedValue({ affected: 1 }),
  findById: jest.fn().mockResolvedValue(new UserEntity()),
  wipe: jest.fn().mockResolvedValue(undefined)
})

const mockAuthService = () => ({
  validateUser: jest.fn().mockImplementation((email, password) => {
    if (email === 'test@test.com' && password === 'pass') {
      const user = new UserEntity()
      user.id = 1
      user.email = email
      return user
    }
    throw new HttpException('Invalid credentials', HttpStatus.CONFLICT)
  }),
  login: jest.fn().mockResolvedValue({
    access_token: 'mock-token',
    name: 'Test User',
    email: 'test@test.com',
    session_token: 'mock-session-token',
    session_token_expiry: new Date(Date.now() + 3600000)
  }),
  decodeJwt: jest.fn().mockReturnValue({
    email: 'test@test.com',
    exp: Date.now() / 1000 + 3600
  }),
  refreshOrRevokeToken: jest.fn().mockResolvedValue('new-mock-token')
})

describe('UserController', () => {
  let usersController: UsersController
  let usersService: UsersService
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        JwtModule.register({
          global: true,
          privateKey: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' }
        }),
        AuthModule
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: AuthService, useFactory: mockAuthService }
      ]
    }).compile()
    usersController = module.get<UsersController>(UsersController)
    usersService = module.get<UsersService>(UsersService)
  })

  afterAll(async () => {
    await usersController.wipe()
  })

  describe('Create User', () => {
    afterEach(async () => {
      await usersService.deleteAllUsers()
    })

    it('should create a new user', async () => {
      mockUserRepository().findUserByEmail.mockResolvedValueOnce(null)

      const user = {
        name: 'Test User',
        email: 'newuser@test.com',
        password: 'pass'
      }

      const response = await usersController.create(user)
      expect(response).toBeDefined()
      expect(response.message).toBe('User created successfully')
      expect(response.status).toBe(201)
    })
  })

  describe('Authentication', () => {
    it('should login a user', async () => {
      const response = await usersController.login({
        email: 'test@test.com',
        password: 'pass'
      })
      expect(response).toBeDefined()
      expect(response.session_token).toBe('mock-token')
    })
  })

  describe('Logout User', () => {
    it('should logout a user', async () => {
      const response = await usersController.logout({
        email: 'test@test.com'
      })
      expect(response).toBeDefined()
      expect(response.message).toBe('User logged out successfully')
    })
  })

  describe('Get User', () => {
    it('should get a user', async () => {
      const response = await usersController.me('Bearer mock-token')
      expect(response).toBeDefined()
      expect(response.email).toBe('test@test.com')
    })
  })
})
