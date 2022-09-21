import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { TokenPayloadDto } from './token-payload.dto';
import { UserEntity } from "modules/user/entities";

export class LoginPayloadDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly fullname: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty({ type: () => TokenPayloadDto })
  readonly token: TokenPayloadDto;

  constructor(
    token: TokenPayloadDto,
    user: UserEntity
  ) {
    this.id = user.id;
    this.fullname = user.fullname;
    this.email = user.email;
    this.token = token;
  }
}
