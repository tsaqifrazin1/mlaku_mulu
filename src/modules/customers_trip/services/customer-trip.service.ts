import { TransactionFor } from "nest-transact";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ModuleRef } from "@nestjs/core";
import { CreateFailedException } from "exceptions/create-failed.exception";
import { CustomerTripEntity } from "modules/customers_trip/entities";
import { CreateCustomerTripDto, UpdateCustomerTripDto } from "modules/customers_trip/dtos";
import { UpdateFailedException } from "exceptions/update-failed.exception";
import { DeleteFailedException } from "exceptions/delete-failed.exception";
import { CustomerEntity } from "modules/customer/entities";

export class CustomerTripService extends TransactionFor<CustomerTripService>{
  constructor(
    @InjectRepository(CustomerTripEntity)
    private readonly _customerTripRepository: Repository<CustomerTripEntity>,
    moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  public async createCustomerTrip(createCustomerTripDto: CreateCustomerTripDto, customerEntity: CustomerEntity): Promise<CustomerTripEntity> {
    try{
      const customerTrip = this._customerTripRepository.create({
        ...createCustomerTripDto,
        customer: customerEntity.toDto(),
      })
      return this._customerTripRepository.save(customerTrip)
    } catch (e) {
      throw new CreateFailedException('Failed create Customer Trip')
    }
  }

  public async getCustomerTripById(id: number): Promise<CustomerTripEntity>{
    return this._customerTripRepository.find({
      where:{
        id
      }
    }).then(response => {
      return response[0]
    })
  }

  public async updateCustomerTrip(customerTrip: CustomerTripEntity, updateCustomerTripDto: UpdateCustomerTripDto): Promise<CustomerTripEntity> {
    try{
      return this._customerTripRepository.save({
        ...customerTrip,
        ...updateCustomerTripDto
      })
    } catch (e){
      throw new UpdateFailedException('Failed update Customer Trip')
    }
  }

  public async deleteCustomerTrip(customerTrip: CustomerTripEntity): Promise<void> {
    try{
      await this._customerTripRepository.remove(customerTrip)
    }catch (e) {
      throw new DeleteFailedException('Failed delete Customer Trip')
    }
  }
}
