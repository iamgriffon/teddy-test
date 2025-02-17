import { ClientController } from '@/application/controllers/client.controller';
import { ClientService } from '@/application/services/client.service';
import { ClientEntity } from '@/db/entities/client.entity';
import { ClientRepositoryProvider } from '@/db/repository/client.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientRepositoryProvider
  ],
  exports: [ClientRepositoryProvider]
})
export class ClientModule {}