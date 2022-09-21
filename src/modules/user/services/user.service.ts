import { TransactionFor } from "nest-transact";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "modules/user/entities";
import { Repository, UpdateResult } from "typeorm";
import { ModuleRef } from "@nestjs/core";
import { UserRegisterDto } from "modules/auth/dtos";
import { CreateFailedException } from "exceptions/create-failed.exception";

export class UserService extends TransactionFor<UserService>{
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  public async createUser(userRegisterDto: UserRegisterDto):Promise<UserEntity> {
    const checkUser = await this._userRepository.findOne({
      where: {
        email: userRegisterDto.email
      }
    })

    if (checkUser) throw new CreateFailedException('Email Already Exist')
    try{
      const user = this._userRepository.create(userRegisterDto)
      return this._userRepository.save(user)
    } catch(e){
      throw new CreateFailedException('Fail Create User')
    }
  }

  public async getUserById(id:number):Promise<UserEntity> {
    return this._userRepository.findOneBy({id})
  }

  public async findUserAuth(email:string): Promise<UserEntity> {
    return this._userRepository.find({
      where: {
        email
      }
    }).then((response) => {
      return response[0]
    })
  }

  public async updateLastLoggedDate(user: UserEntity, isSuccessiveLogged: boolean): Promise<UserEntity> {
    const { lastSuccessfulLoggedDate } = user

    if (!isSuccessiveLogged){
      await this._updateLastFailedLoggedDate(user)
    }else if (isSuccessiveLogged && !lastSuccessfulLoggedDate) {
      await this._updateLastSuccessfulLoggedDate(user)
    }

    return this.getUserById(user.id)
  }

  public async updateLastLogoutDate(
    user: UserEntity,
  ): Promise<UpdateResult> {
    return this._userRepository.createQueryBuilder('userAuth')
      .update()
      .set({ lastLogoutDate: new Date() })
      .where('id = :id', { id: user.id })
      .execute();
  }

  public async _updateLastFailedLoggedDate(user: UserEntity):Promise<UpdateResult> {
    return this._userRepository
      .createQueryBuilder()
      .update(user)
      .set({ lastFailedLoggedDate: new Date()})
      .where('id = :id', { id: user.id })
      .execute()
  }

  public async _updateLastSuccessfulLoggedDate(user: UserEntity): Promise<UpdateResult> {
    return this._userRepository
      .createQueryBuilder()
      .update(user)
      .set({ lastSuccessfulLoggedDate: new Date()})
      .where('id = :id', { id: user.id })
      .execute()
  }
}
