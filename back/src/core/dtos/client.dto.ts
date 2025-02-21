import { IsDate, IsNumber, IsString, Length, Min } from 'class-validator'
import { UpdateResult } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

export class ClientDTO {
  @ApiProperty({ example: 1, description: 'Client ID' })
  @IsNumber()
  @Min(0, { message: 'Id must be greater than 0' })
  id: number

  @ApiProperty({ example: 'John Doe', description: 'Client name' })
  @IsString()
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string

  @ApiProperty({ example: 500000, description: 'Client salary' })
  @IsNumber()
  @Min(0, { message: 'Sallary must be greater than 0' })
  sallary: number

  @ApiProperty({ example: 1000000, description: 'Company salary' })
  @IsNumber()
  @Min(0, { message: 'Company sallary must be greater than 0' })
  company_sallary: number

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Creation date'
  })
  @IsDate()
  created_at?: Date

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Last update date'
  })
  @IsDate()
  updated_at?: Date
}

export class GetClientsDTO {
  @ApiProperty({ type: [ClientDTO] })
  clients: ClientDTO[]

  @ApiProperty({ example: 100, description: 'Total clients count' })
  total: number

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number

  @ApiProperty({ example: 10, description: 'Total number of pages' })
  total_pages: number
}

export class UpdateClientDTO {
  @ApiProperty({
    example: 'Client updated successfully',
    description: 'Update result message'
  })
  message: string

  @ApiProperty({
    example: { affected: 1 },
    description: 'Update result raw data'
  })
  raw: UpdateResult
}

export class DeleteClientDTO {
  @ApiProperty({ example: 'Client deleted successfully' })
  message: string

  @ApiProperty({ example: 1 })
  affected?: number
}

export class CreateClientDTO {
  name: string
  sallary: number
  company_sallary: number
}
