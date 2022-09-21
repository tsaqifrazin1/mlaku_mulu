import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserEntity } from 'modules/user/entities';

export class RegisterPayloadDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly fullname: string;

  @ApiProperty()
  @IsOptional()
  readonly phone_number?: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.fullname = user.fullname;
    this.email = user.email;
  }
}
