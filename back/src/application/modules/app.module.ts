import { Module } from '@nestjs/common'
import { AppController } from '@/application/controllers/app.controller'
import { AppService } from '@/application/services/app.service'
import { ClientModule } from '@/application/modules/client.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from '@/application/modules/users.module'
import { DatabaseModule } from '@/db/helpers/db-module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    ClientModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
