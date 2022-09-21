import { TransactionFor } from "nest-transact";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { ModuleRef } from "@nestjs/core";
import { CreateFailedException } from "exceptions/create-failed.exception";
import { CustomerEntity } from "modules/customer/entities";
import { CreateCustomerDto, UpdateCustomerDto } from "modules/customer/dtos";
import { UpdateFailedException } from "exceptions/update-failed.exception";
import { DeleteFailedException } from "exceptions/delete-failed.exception";

export class CustomerService extends TransactionFor<CustomerService>{
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly _customerRepository: Repository<CustomerEntity>,
    moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  public async createCustomer(createCustomerDto: CreateCustomerDto):Promise<CustomerEntity> {
    const checkCustomer = await this._customerRepository.findOne({
      where: {
        nik: createCustomerDto.nik
      }
    })
    if (checkCustomer) {
      throw new CreateFailedException('Customer nik already exist')
    }
    try{
      const customer = this._customerRepository.create(createCustomerDto)
      return this._customerRepository.save(customer)
    } catch(e) {
      throw new CreateFailedException('Failed create Customer')
    }
  }

  public async getCustomerById(id: number):Promise<CustomerEntity> {
    return this._customerRepository.find({
      where: {
        id
      }
    }).then(response => {
      return response[0]
    })
  }

  public async getCustomerTrip(nik: string): Promise<CustomerEntity>{
    return this._customerRepository.find({
      relations: {
        customer_trips: true
      },
      where: {
        nik
      }
    }).then(response => {
      return response[0]
    })
  }

  public async updateCustomer(customer: CustomerEntity, updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
    try{
      return this._customerRepository.save({
        ...customer,
        ...updateCustomerDto
      })
    } catch(e){
      throw new UpdateFailedException('Failed update Customer')
    }
  }

  public async deleteCustomer(customer: CustomerEntity): Promise<void> {
    try{
      await this._customerRepository.remove(customer)
    } catch (e) {
      throw new DeleteFailedException("Failed delete Customer")
    }
  }
}
