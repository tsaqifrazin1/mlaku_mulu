import { AuthService } from "modules/auth/services";
import { UserService } from "modules/user/services";
import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from "@nestjs/swagger";
import { DataSource } from "typeorm";
import { TransformResponseInterceptor } from "interceptors/transform-response.interceptor";
import { LoginPayloadDto, RegisterPayloadDto, UserLoginDto, UserRegisterDto } from "modules/auth/dtos";
import { AuthGuard } from "../../../guards";
import { AuthUser } from "../../../decorators";
import { UserEntity } from "modules/user/entities";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TransformResponseInterceptor)
  async register(@Body() userRegisterDto: UserRegisterDto){
    const user = await this.dataSource.transaction(async manager => {
      return await this._userService.createUser(userRegisterDto)
    })

    return {
      message: 'Success Create User',
      data: new RegisterPayloadDto(user)
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformResponseInterceptor)
  async userLogin(@Body() userLoginDto: UserLoginDto) {
    const {user, token } = await this.dataSource.transaction(async manager => {
      const user = await this._authService.validateUser(userLoginDto);
      const token = await this._authService.createToken(user);

      return { user, token }
    })

    return {
      message: 'Login Success',
      data: new LoginPayloadDto(token, user),
    };
  }

  @Patch('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async userLogout(@AuthUser() user: UserEntity){
    await this._userService.updateLastLogoutDate(user);

    return{
      message: 'Success Logout Account'
    }
  }
}
