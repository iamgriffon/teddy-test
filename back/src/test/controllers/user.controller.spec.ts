import { Test } from '@nestjs/testing'

import { TestDatabaseModule } from '@/db/helpers/test-db-module'
import { TestingModule } from '@nestjs/testing'
import { UsersController } from '@/application/controllers/users.controller'
import { UserRepositoryProvider } from '@/db/repository/user.repository'
import { UsersService } from '@/application/services/users.service'
import { UserEntity } from '@/db/entities'
import { JwtModule } from '@nestjs/jwt'
import { HttpException } from '@nestjs/common'
import { AuthModule } from '@/application/modules/auth.module'

describe('UserController', () => {
  let usersController: UsersController
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' }
        }),
        AuthModule
      ],
      controllers: [UsersController],
      providers: [UsersService, UserRepositoryProvider]
    }).compile()
    usersController = app.get<UsersController>(UsersController)
  })

  afterAll(async () => {
    await usersController.wipe()
  })

  describe('Create User', () => {
    it('should create a new user', async () => {
      const user = new UserEntity()
      user.name = 'John Doe'
      user.email = 'john.doe@example.com'
      user.password = 'password'
      const response = await usersController.create(user)
      expect(response).toBeDefined()
      expect(response.message).toBe('User created successfully')
      expect(response.status).toBe(201)
    })
  })

  describe('Authentication', () => {
    it('should login a user', async () => {
      const response = await usersController.login({
        email: 'john.doe@example.com',
        password: 'password'
      })
      expect(response).toBeDefined()
      expect(response.name).toBe('John Doe')
      expect(typeof response.session_token).toBe('string')
      expect(response.session_token_expiry).toBeInstanceOf(Date)
    })
  })

  describe('Logout User', () => {
    it('should logout a user', async () => {
      const response = await usersController.logout(1)
      expect(response).toBeDefined()
      expect(response.message).toBe('User logged out successfully')
    })
  })

  describe('Get User', () => {
    it('should get a user', async () => {
      const response = await usersController.login({
        email: 'john.doe@example.com',
        password: 'password'
      })
      const token = response.session_token!
      const userResponse = await usersController.me(token)
      expect(userResponse).toBeDefined()
      expect(userResponse.name).toBe('John Doe') 
      expect(userResponse.email).toBe('john.doe@example.com')
      expect(typeof userResponse.session_token).toBe('string')
      expect(userResponse.session_token_expiry).toBeInstanceOf(Date)
    })
  })
})
