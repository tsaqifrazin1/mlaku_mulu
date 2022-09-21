import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { CustomerEntity } from "../entities";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCustomerDto {
  @ApiPropertyOptional()
  @IsString()
  readonly fullname: string

  @ApiPropertyOptional()
  @IsString()
  readonly nik: string

  @ApiPropertyOptional()
  @IsNumber()
  readonly age?: number
}
