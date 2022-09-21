import { AbstractEntity } from 'common/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  UpdateDateColumn
} from "typeorm";
import { CustomerDto } from '../dtos/index';
import { CustomerTripEntity } from "modules/customers_trip/entities";

@Entity({
  name: 'customers',
})
export class CustomerEntity extends AbstractEntity<CustomerDto> {
  @Column({ nullable: false, unique: true })
  nik: string

  @Column({  nullable: false })
  fullname: string

  @Column({  nullable: false })
  age: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(() => CustomerTripEntity, (custumer_trip: CustomerTripEntity) => custumer_trip.customer, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  customer_trips: CustomerTripEntity[];

  dtoClass = CustomerDto;
}
