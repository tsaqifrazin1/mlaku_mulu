import { AbstractEntity } from 'common/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerTripDto } from '../dtos/index';
import { CustomerEntity } from "modules/customer/entities";

@Entity({
  name: 'customers_trip',
})
export class CustomerTripEntity extends AbstractEntity<CustomerTripDto> {
  @Column({ nullable: false })
  destination: string

  @Column({  nullable: false })
  start_date: Date

  @Column({  nullable: false })
  end_date: Date

  @ManyToOne(() => CustomerEntity, (customer: CustomerEntity) => customer.customer_trips, {
    nullable: false,
  })
  @JoinColumn()
  customer: CustomerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  dtoClass = CustomerTripDto;
}
