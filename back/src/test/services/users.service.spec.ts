import { Test } from '@nestjs/testing'
import { UsersService } from '@/application/services/users.service'
import { UserRepository } from '@/db/repository/user.repository'
import { AuthService, JwtPayload } from '@/application/helpers/auth.service'
import { UserEntity } from '@/db/entities/users.entity'
import { BadRequestException, HttpException } from '@nestjs/common'

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
  updateUser: jest.fn(),
  findById: jest.fn().mockResolvedValue(new UserEntity())
})

const mockAuthService = () => ({
  validateUser: jest.fn(),
  login: jest.fn(),
  decodeJwt: jest.fn().mockReturnValue({
    email: 'test@test.com',
    name: 'name',
    exp: Date.now() / 1000 + 3600,
    iat: Date.now() / 1000
  } as JwtPayload),
  refreshOrRevokeToken: jest.fn(),
  generateJwt: jest.fn()
})

describe('UsersService', () => {
  let service: jest.Mocked<UsersService>
  let userRepository: jest.Mocked<UserRepository>
  let authService: jest.Mocked<AuthService>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: AuthService, useFactory: mockAuthService }
      ]
    }).compile()

    service = module.get<UsersService>(
      UsersService
    ) as jest.Mocked<UsersService>
    userRepository = module.get<UserRepository>(
      UserRepository
    ) as jest.Mocked<UserRepository>
    authService = module.get<AuthService>(
      AuthService
    ) as jest.Mocked<AuthService>
  })

  describe('create', () => {
    it('should create a user successfully', async () => {
      const mockUserDto = {
        name: 'Test',
        email: 'test@test.com',
        password: 'pass'
      }
      userRepository.createUser.mockResolvedValue(new UserEntity())

      const result = await service.create(mockUserDto)
      expect(result.status).toBe(201)
      expect(result.message).toBe('User created successfully')
    })

    it('should throw on creation failure', async () => {
      userRepository.createUser.mockRejectedValue(new Error())
      await expect(service.create({} as any)).rejects.toThrow(
        BadRequestException
      )
    })
  })

  describe('login', () => {
    it('should login successfully', async () => {
      const mockUser = new UserEntity()
      mockUser.email = 'test@test.com'
      mockUser.password = 'pass'
      authService.validateUser.mockResolvedValue(mockUser)
      authService.login.mockResolvedValue({
        email: 'test@test.com',
        name: 'name',
        access_token: 'token'
      })

      const result = await service.login({
        email: 'test@test.com',
        password: 'pass'
      })
      expect(result.session_token).toBe('token')
      expect(authService.validateUser).toHaveBeenCalled()
    })

    it('should throw for invalid credentials', async () => {
      authService.validateUser.mockResolvedValue(null)
      await expect(service.login({} as any)).rejects.toThrow(HttpException)
    })
  })

  describe('logout', () => {
    it('should clear session token', async () => {
      const mockUser = new UserEntity()
      userRepository.findById.mockResolvedValue(mockUser)
      authService.refreshOrRevokeToken.mockResolvedValue(null)

      const result = await service.logout(1)
      expect(result.message).toBe('User logged out successfully')
    })
  })

  describe('getUser', () => {
    it('should return user with refreshed token', async () => {
      const mockUser = new UserEntity()
      mockUser.name = 'name'
      mockUser.email = 'test@test.com'

      userRepository.findUserByEmail.mockResolvedValue(mockUser)
      authService.decodeJwt.mockReturnValue({
        email: 'test@test.com',
        name: 'name',
        exp: Date.now() / 1000 + 3600
      } as JwtPayload)

      const result = await service.getUser('valid-token')
      expect(result.name).toBe('name')
      expect(result.email).toBe('test@test.com')
      expect(result.session_token).not.toBe('valid-token')
      expect(result.session_token_expiry).toBeInstanceOf(Date)
    })

    it('should throw for invalid token', async () => {
      authService.decodeJwt.mockReturnValue(null)
      await expect(service.getUser('invalid-token')).rejects.toThrow(
        HttpException
      )
    })
  })
})
