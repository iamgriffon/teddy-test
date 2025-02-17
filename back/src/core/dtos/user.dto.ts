import { IsString, Length, Min, IsNumber, IsDate } from 'class-validator';

export class UserDTO {
  @IsNumber()
  @Min(0, { message: 'Id must be greater than 0' })
  id: number;

  @IsString()
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name!: string;

  @IsString()
  @Length(3, 255, { message: 'Session token must be between 3 and 255 characters' })
  session_token!: string;

  @IsDate()
  session_token_expiry!: Date;
}

export type CreateUserDTO = Omit<UserDTO, 'id' | 'session_token' | 'session_token_expiry'>;