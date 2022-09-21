import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomerService } from "modules/customer/services";
import { DataSource } from "typeorm";
import { AuthGuard } from "../../../guards";
import { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from "modules/customer/dtos";
import { TransformResponseInterceptor } from "interceptors/transform-response.interceptor";
import { NotFoundEntitiesException } from "exceptions/not-found.exception";

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(
    private readonly _customerService: CustomerService,
    private readonly dataSource: DataSource
  ) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto){
    const customer = await this._customerService.createCustomer(createCustomerDto)

    return {
      message: 'Success create Customer',
      data: customer.toDto()
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  async getCustomerById(@Param('id') id: number){
    const customer = await this._customerService.getCustomerById(id)

    return {
      message: 'Success get Customer by Id',
      data: customer.toDto()
    }
  }

  @Get('trip/:nik')
  @HttpCode(HttpStatus.FOUND)
  @UseInterceptors(TransformResponseInterceptor)
  async getCustomerTripsByNik(@Param('nik') nik: string){
    const customersTrip = await this._customerService.getCustomerTrip(nik)

    return {
      message: 'Success get Customer Trips',
      data: customersTrip.toDto()
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(TransformResponseInterceptor)
  @HttpCode(HttpStatus.OK)
  async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto){
    const customer = await this._customerService.getCustomerById(id)
    if(!customer) throw new NotFoundEntitiesException('Customer not found')

    const updatedCustomer = await this._customerService.updateCustomer(customer, updateCustomerDto)

    return {
      message: 'Success update Customer',
      data: new CustomerDto(updatedCustomer)
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(TransformResponseInterceptor)
  @HttpCode(HttpStatus.OK)
  async deleteCustomer(@Param('id') id: number){
    const customer = await this._customerService.getCustomerById(id)
    if(!customer) throw new NotFoundEntitiesException('Customer not found')

    await this._customerService.deleteCustomer(customer)

    return {
      message: 'Success delete Customer'
    }
  }
}
