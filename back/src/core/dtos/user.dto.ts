import { IsString, IsNotEmpty, IsEmail, Equals } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Equals('password')
  confirmPassword!: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}