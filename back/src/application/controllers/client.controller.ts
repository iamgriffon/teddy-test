import { ClientService } from '../services/client.service'
import {
  ClientDTO,
  DeleteClientDTO,
  ErrorClientDTO,
  GetClientsDTO
} from '../../core/dtos'
import { ClientEntity } from '../../db/entities/client.entity'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { UpdateResult } from 'typeorm'

@Controller('/api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findMany(
    @Query('page') page: string = '1',
    @Query('size') size: string = '10'
  ): Promise<GetClientsDTO> {
    const pageNumber = Number(page);
    const sizeNumber = Number(size);
    const data = await this.clientService.findMany({
      skip: (pageNumber - 1) * sizeNumber,
      take: sizeNumber
    })
    const total_pages = Math.ceil(data.total / sizeNumber)
    if (!data) {
      return { clients: [], total: 0, page: 1, total_pages: 1 }
    }
    return { clients: data.clients, total: data.total, page: pageNumber, total_pages }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ClientDTO | null> {
    const result = await this.clientService.findById(id)
    if (!result) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND)
    }
    return result
  }

  @Post()
  async create(
    @Body() client: ClientEntity
  ): Promise<ClientDTO | HttpException> {
    if (!client.name?.trim() || !client.company_sallary || !client.sallary) {
      throw new HttpException('Invalid client', HttpStatus.BAD_REQUEST);
    }
    const result = await this.clientService.createClient(client)
    if (!result) {
      throw new HttpException('Client not created', HttpStatus.BAD_REQUEST);
    }
    return result
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() client: ClientEntity
  ): Promise<UpdateResult | HttpException> {
    if (!client){
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }
    const result = await this.clientService.updateClient(id, client)  
    if (result.affected === 0 || !result) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return result
  }

  @Delete('wipe')
  async wipeAll(): Promise<void> {
    return this.clientService.wipe()
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteClientDTO | HttpException> {
    const result = await this.clientService.deleteClient(id)
    if (result.affected === 0) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Client deleted successfully',
      ...result,
      affected: result.affected || 0
    }
  }

  @Post('seed/:count')
  async seedClients(@Param('count') count: number): Promise<string> {
    await Promise.all([this.clientService.createMany(count)])
    return `Seeded ${count} clients successfully`
  }
}
