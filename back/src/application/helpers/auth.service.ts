import { JwtService } from '@nestjs/jwt'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { UserRepository } from '@/db/repository/user.repository'
import { UserEntity } from '@/db/entities/users.entity'
import { comparePassword } from '@/core/helpers/password'

dotenv.config({ path: '.env' })

const JWT_EXPIRATION_TIME = 15 * 60
const JWT_REFRESH_EXPIRATION_TIME = 7 * 24 * 60 * 60

export type JwtPayload = {
  email: string
  name: string
  exp: number
  iat: number
} | null

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {
    this.jwtService = new JwtService({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME }
    })
  }

  async generateJwt(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload)
  }

  async refreshOrRevokeToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: true
      })
      if (payload && payload.exp) {
        const currentTimeSec = Math.floor(Date.now() / 1000)
        if (currentTimeSec > payload.exp + JWT_REFRESH_EXPIRATION_TIME) {
          return null
        }
      }
      delete payload.iat
      delete payload.exp
      return await this.jwtService.signAsync(payload)
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
  }

  async verifyJwt(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token)
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
  }

  decodeJwt(token: string): JwtPayload {
    return this.jwtService.decode(token)
  }

  async refreshToken(refreshToken: string): Promise<{
    token: string
    refreshToken: string
  } | null> {
    const payload = await this.verifyJwt(refreshToken)

    if (!payload) {
      return null
    }

    const user = this.decodeJwt(payload)
    if (!user) {
      return null
    }

    const newPayload = { email: user.email, name: user.name }
    const newToken = await this.generateJwt(newPayload)
    const newRefreshToken = await this.refreshOrRevokeToken(refreshToken)
    if (!newRefreshToken) {
      return null
    }
    return { token: newToken, refreshToken: newRefreshToken }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET!
      })
    } catch {
      return null
    }
  }

  async validateUser(email: string, pass: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findUserByEmail(email)
    if (user && (await comparePassword(pass, user.password))) {
      return user
    }
    return null
  }

  async login(user: UserEntity) {
    const payload = { email: user.email, name: user.name }
    return {
      ...payload,
      access_token: await this.generateJwt(payload)
    }
  }
}
