import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { UserEntity } from "../entities";

export class UserDto extends AbstractDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly fullname: string

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email
    this.fullname = user.fullname;
  }
}
