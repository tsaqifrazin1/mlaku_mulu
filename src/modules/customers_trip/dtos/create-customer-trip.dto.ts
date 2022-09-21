import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { CustomerTripEntity } from "../entities";
import { CustomerEntity } from "modules/customer/entities";
import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateCustomerTripDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly destination: string

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly start_date: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly end_date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly customer_id: number
}
