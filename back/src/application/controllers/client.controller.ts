import { ClientService } from '../services/client.service';
import { ClientDTO, DeleteClientDTO, ErrorClientDTO } from '../../core/dtos';
import { ClientEntity } from '../../db/entities/client.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';

@Controller('/api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findMany(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ): Promise<ClientDTO[]> {
    const clients = await this.clientService.findMany({
      skip: (page - 1) * size,
      take: size,
    });
    if (!clients) {
      return [];
    }
    return clients;
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ClientDTO | null> {
    return this.clientService.findById(id);
  }

  @Post()
  async create(@Body() client: ClientEntity): Promise<ClientDTO | ErrorClientDTO> {
    const result = await this.clientService.createClient(client);
    if (!client.name.trim() || !client.company_sallary || !client.sallary) {
      return { error: 'Invalid client' };
    }
    if (!result) {
      return { error: 'Client not created' };
    }
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() client: ClientEntity,
  ): Promise<UpdateResult> {
    return this.clientService.updateClient(id, client);
  }

  @Delete('wipe')
  async wipeAll(): Promise<void> {
    return this.clientService.wipe();
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteClientDTO> {
    const result = await this.clientService.deleteClient(id);
    if (result.affected === 0) {
      return { message: 'Client not found', ...result, affected: 0 };
    }
    return {
      message: 'Client deleted successfully',
      ...result,
      affected: result.affected || 0,
    };
  }

  @Post('seed/:count')
  async seedClients(@Param('count') count: number): Promise<string> {
    await Promise.all([this.clientService.createMany(count)]);
    return `Seeded ${count} clients successfully`;
  }
}
