import { UsersController } from '@/application/controllers/users.controller'
import { Module } from '@nestjs/common'

@Module({
  controllers: [UsersController]
})
export class UserRoutes {}
