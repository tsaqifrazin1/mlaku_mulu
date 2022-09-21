import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTripEntity } from "modules/customers_trip/entities";
import { CustomerTripService } from "modules/customers_trip/services";
import { CustomerModule } from "modules/customer";
import { CustomerTripController } from "modules/customers_trip/controllers";

@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forFeature([CustomerTripEntity])
  ],
  controllers: [CustomerTripController],
  providers: [CustomerTripService],
  exports: [CustomerTripService],
})
export class CustomerTripModule {}
