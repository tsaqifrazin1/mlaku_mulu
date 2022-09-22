import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { CustomerEntity } from "../entities";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly fullname: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nik: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly age: number
}
