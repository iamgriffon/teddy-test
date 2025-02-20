import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/db/entities/users.entity'
import { AuthService } from '../helpers/auth.service'
import { AuthGuard } from '../helpers/auth.guard'
import { UserRepositoryProvider } from '@/db/repository/user.repository'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserRepositoryProvider, AuthService, AuthGuard],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}
