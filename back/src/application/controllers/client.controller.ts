import { ClientService } from '../services/client.service'
import {
  ClientDTO,
  DeleteClientDTO,
  GetClientsDTO,
  CreateClientDTO
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
  Query,
  UseGuards
} from '@nestjs/common'
import { UpdateResult } from 'typeorm'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger'
import { AuthGuard } from '../helpers/auth.guard'

@ApiTags('clients')
@Controller('clients')
@UseGuards(AuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Get paginated clients' })
  @ApiQuery({ name: 'page', type: Number, example: 1 })
  @ApiQuery({ name: 'size', type: Number, example: 10 })
  @ApiResponse({ status: 200, type: GetClientsDTO })
  @Get()
  async findMany(
    @Query('page') page: string = '1',
    @Query('size') size: string = '10'
  ): Promise<GetClientsDTO> {
    const pageNumber = Number(page)
    const sizeNumber = Number(size)
    const data = await this.clientService.findMany({
      skip: (pageNumber - 1) * sizeNumber,
      take: sizeNumber
    })
    const total_pages = Math.ceil(data.total / sizeNumber)
    if (!data) {
      return { clients: [], total: 0, page: 1, total_pages: 1 }
    }

    const response = new GetClientsDTO()
    response.clients = data.clients
    response.total = data.total
    response.page = pageNumber
    response.total_pages = total_pages
    return response
  }

  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({ status: 200, type: ClientDTO })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ClientDTO | null> {
    const result = await this.clientService.findById(id)
    if (!result) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND)
    }
    return result
  }

  @ApiOperation({ summary: 'Create new client' })
  @ApiBody({
    type: ClientEntity,
    examples: {
      example: {
        value: {
          name: 'John Doe',
          sallary: 500000,
          company_sallary: 1000000
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    type: ClientDTO,
    description: 'Successfully created client'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid client data'
  })
  @Post()
  async create(
    @Body() data: CreateClientDTO
  ): Promise<ClientDTO | HttpException> {
    const client = new ClientEntity()
    client.name = data.name
    client.company_sallary = data.company_sallary
    client.sallary = data.sallary
    client.created_at = new Date()
    client.updated_at = undefined

    const result = await this.clientService.create(client)
    return result
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Successfully updated client',
    type: UpdateResult
  })
  @ApiResponse({
    status: 404,
    description: 'Client not found'
  })
  async update(
    @Param('id') id: number,
    @Body() client: ClientEntity
  ): Promise<UpdateResult | HttpException> {
    if (!client) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST)
    }
    client.updated_at = new Date()
    const result = await this.clientService.updateClient(id, client)
    if (result.affected === 0 || !result) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND)
    }
    return result
  }

  @Delete('wipe')
  async wipeAll(): Promise<void> {
    try {
      return await this.clientService.wipe()
    } catch {
      throw new HttpException(
        'Failed to wipe clients',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: DeleteClientDTO,
    description: 'Successfully deleted client'
  })
  async delete(
    @Param('id') id: number
  ): Promise<DeleteClientDTO | HttpException> {
    const result = await this.clientService.deleteClient(id)
    if (result.affected === 0) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND)
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
