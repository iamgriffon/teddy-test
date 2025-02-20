import { Module } from '@nestjs/common'
import { UsersService } from '@/application/services/users.service'
import { UsersController } from '@/application/controllers/users.controller'
import { JwtModule } from '@nestjs/jwt'
import { UserRepositoryProvider } from '@/db/repository/user.repository'
import { UserEntity } from '@/db/entities/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth.module'
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryProvider],
  exports: [UserRepositoryProvider]
})
export class UsersModule {}
