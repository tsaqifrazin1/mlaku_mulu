import { AbstractEntity } from 'common/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserDto } from '../dtos/index';

@Entity({
  name: 'users',
})
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: false, unique: true })
  email: string

  @Column({  nullable: false })
  fullname: string

  @Column({  nullable: false })
  password: string

  @Column({ nullable: true })
  lastSuccessfulLoggedDate?: Date;

  @Column({ nullable: true })
  lastFailedLoggedDate?: Date;

  @Column({ nullable: true })
  lastLogoutDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  dtoClass = UserDto;
}
