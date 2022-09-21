import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { CustomerTripEntity } from "../entities";
import { CustomerEntity } from "modules/customer/entities";

export class CustomerTripDto extends AbstractDto {
  @ApiProperty()
  readonly destination: string

  @ApiProperty()
  readonly start_date: Date;

  @ApiProperty()
  readonly end_date: Date;

  constructor(customerTrip: CustomerTripEntity) {
    super(customerTrip);
    this.destination = customerTrip.destination
    this.start_date = customerTrip.start_date;
    this.end_date = customerTrip.end_date;
  }
}
