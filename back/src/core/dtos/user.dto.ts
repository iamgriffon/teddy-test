import { IsString, Length, Min, IsNumber, IsDate } from 'class-validator'
import { ApiProperty, PickType } from '@nestjs/swagger'

export class UserDTO {
  @ApiProperty({
    description: 'Unique user identifier',
    example: 1,
    type: Number
  })
  @IsNumber()
  @Min(0, { message: 'Id must be greater than 0' })
  id: number

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    required: true,
    minLength: 3,
    maxLength: 255
  })
  @IsString()
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name!: string

  @ApiProperty({
    description: 'Session authentication token',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    required: true,
    minLength: 3,
    maxLength: 255
  })
  @IsString()
  @Length(3, 255, {
    message: 'Session token must be between 3 and 255 characters'
  })
  session_token!: string

  @ApiProperty({
    description: 'Expiration date of the session token',
    example: '2024-12-31T23:59:59.999Z',
    type: Date
  })
  @IsDate()
  session_token_expiry!: Date
}

export class CreateUserDTO extends PickType(UserDTO, ['name']) {}
