import { CreateUserRequestDTO, LoginUserDTO, UserDTO } from '../../core/dtos'
import { hashPassword } from '../../core/helpers/password'
import { refreshOrRevokeJwt } from '../../core/helpers/jwt'
import { UserRepository } from '../../db/repository/user.repository'
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from '../helpers/auth.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async create(userData: CreateUserRequestDTO) {
    try {
      await this.userRepository.createUser({
        ...userData,
        password: await hashPassword(userData.password)
      })
      return { status: 201, message: 'User created successfully' }
    } catch {
      throw new BadRequestException('Failed to create user')
    }
  }

  async login(creds: LoginUserDTO) {
    const user = await this.authService.validateUser(
      creds.email,
      creds.password
    )
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const tokens = await this.authService.login(user)

    const response = new UserDTO()
    response.name = user.name
    response.email = user.email
    response.session_token = tokens.access_token
    response.session_token_expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    return response
  }

  async logout(email: string) {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user?.id) {
      throw new UnauthorizedException('User not found')
    }
    const response = new UserDTO()
    response.name = user.name
    response.email = user.email
    response.session_token = null
    response.session_token_expiry = null
    await this.userRepository.updateUser(user.id, user)
    return {
      status: 200,
      message: 'User logged out successfully'
    }
  }

  async getUser(Bearer: string) {
    const token = Bearer.split(' ')[1]
    const payload = this.authService.decodeJwt(token)
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    const user = await this.userRepository.findUserByEmail(payload.email)
    const response = new UserDTO()
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    response.id = user.id
    response.name = user.name
    response.email = user.email
    response.session_token = await refreshOrRevokeJwt(String(token))
    response.session_token_expiry = new Date(Date.now() + 1 * 60 * 60 * 1000)

    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return response
  }

  async deleteUser(id: number) {
    try {
      await this.userRepository.deleteUser(id)
      return {
        status: 200,
        message: 'User deleted successfully'
      }
    } catch {
      throw new HttpException('Failed to delete user', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteAllUsers() {
    try {
      await this.userRepository.wipe()
    } catch {
      throw new HttpException(
        'Failed to delete all users',
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
