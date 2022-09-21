import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { CustomerEntity } from "../entities";
import { CustomerTripEntity } from "modules/customers_trip/entities";
import { CustomerTripDto } from "modules/customers_trip/dtos";

export class CustomerDto extends AbstractDto {
  @ApiProperty()
  readonly fullname: string

  @ApiProperty()
  readonly nik: string

  @ApiProperty()
  readonly age: number

  @ApiPropertyOptional({ type: () => CustomerTripDto })
  readonly customer_trips?: CustomerTripDto[]

  constructor(customer: CustomerEntity) {
    super(customer);
    this.nik = customer.nik
    this.fullname = customer.fullname;
    this.age = customer.age;
    this.customer_trips = customer.customer_trips?.toDtos()
  }
}
