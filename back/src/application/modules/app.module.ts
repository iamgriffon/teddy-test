import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/application/controllers/app.controller';
import { AppService } from '@/application/services/app.service';
import { ClientModule } from '@/application/modules/client.module';
import { ClientEntity } from '@/db/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      password: '123456',
      username: 'sa',
      entities: [ClientEntity],
      database: 'teddy',
      synchronize: true,
      logging: true,
    }),
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
