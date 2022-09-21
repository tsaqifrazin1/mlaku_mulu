import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly fullname: string

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string;
}
