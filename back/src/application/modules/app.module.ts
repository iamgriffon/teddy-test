import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from '@/application/controllers/app.controller'
import { AppService } from '@/application/services/app.service'
import { ClientModule } from '@/application/modules/client.module'
import { ClientEntity } from '@/db/entities/client.entity'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [ClientEntity],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      logging: true
    }),
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
