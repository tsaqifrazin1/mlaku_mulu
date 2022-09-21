import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from "modules/user/entities";
import { ConfigService } from "@nestjs/config";
import { TokenPayloadDto, UserLoginDto } from "../dtos";
import { UtilsService } from "utils/services";
import { UserPasswordNotValidException } from "modules/auth/exceptions";
import { UserService } from "modules/user/services";


@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    private readonly _userService: UserService
  ) {}

  public async createToken(user: UserEntity): Promise<TokenPayloadDto> {
    const { id } = user;

    return new TokenPayloadDto({
      expiresIn: this._configService.get('JWT_EXPIRATION_TIME'),
      accessToken: await this._jwtService.signAsync({ id }),
    });
  }

  public async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const { email, password } = userLoginDto;
    let user = await this._userService.findUserAuth(email);

    if (!user) {
      throw new UserPasswordNotValidException('Wrong Password or Email');
    }

    const isPasswordValid = await UtilsService.validateHash(
      password,
      user.password,
    );

    user = await this._userService.updateLastLoggedDate(
      user,
      isPasswordValid,
    );

    if (!isPasswordValid) {
      throw new UserPasswordNotValidException('Wrong Password or Email');
    }

    return user;
  }
}
