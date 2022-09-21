import {
  BadRequestException,
  Body,
  Controller, Delete, Get,
  HttpCode,
  HttpStatus, Param, Patch,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomerTripService } from "modules/customers_trip/services";
import { DataSource } from "typeorm";
import { AuthGuard } from "../../../guards";
import { TransformResponseInterceptor } from "interceptors/transform-response.interceptor";
import { CreateCustomerTripDto, CustomerTripDto, UpdateCustomerTripDto } from "modules/customers_trip/dtos";
import { CustomerService } from "modules/customer/services";
import { NotFoundEntitiesException } from "exceptions/not-found.exception";

@Controller('trips')
@ApiTags('trips')
export class CustomerTripController {
  constructor(
    private readonly _customerTripService: CustomerTripService,
    private readonly _customerService: CustomerService,
    private readonly dataSource: DataSource
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  @ApiBearerAuth()
  async createCustomerTrip(@Body() createCustomerTripDto: CreateCustomerTripDto){
    const { start_date, end_date, customer_id } = createCustomerTripDto
    if(start_date > end_date) throw new BadRequestException('end_date must be greater than start_date')

    const customer = await this._customerService.getCustomerById(customer_id)
    if(!customer) throw new NotFoundEntitiesException('Customer not found')

    const customerTrip = await this._customerTripService.createCustomerTrip(createCustomerTripDto, customer)

    return {
      message: 'Success create Customer Trip',
      data: customerTrip.toDto()
    }
  }

  @Get(':id')
  @UseInterceptors(TransformResponseInterceptor)
  @HttpCode(HttpStatus.OK)
  async getCustomerTripById(@Param('id') id: number){
    const customerTrip = await this._customerTripService.getCustomerTripById(id)
    if(!customerTrip) throw new NotFoundEntitiesException('Customer Trip not found')

    return {
      message: 'Success get Customer Trip',
      data: customerTrip.toDto()
    }
  }

  @Patch(':id')
  @UseInterceptors(TransformResponseInterceptor)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async updateCustomerTrip(@Param('id') id: number, @Body() updateCustomerTripDto: UpdateCustomerTripDto) {
    const { start_date, end_date } = updateCustomerTripDto
    if(start_date > end_date ) throw new BadRequestException('end_date must be greater than start_date')

    const customerTrip = await this._customerTripService.getCustomerTripById(id)
    if(!customerTrip) throw new NotFoundEntitiesException('Customer Trip not found')

    return {
      message: 'Success update Customer Trip',
      data: new CustomerTripDto(customerTrip)
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async deleteCustomerTrip(@Param('id') id: number){
    const customerTrip = await this._customerTripService.getCustomerTripById(id)
    if(!customerTrip) throw new NotFoundEntitiesException('Customer Trip not found')

    await this._customerTripService.deleteCustomerTrip(customerTrip)
    return {
      message: 'Success delete Customer Trip'
    }
  }
}
