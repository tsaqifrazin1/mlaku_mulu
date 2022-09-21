import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UserEntity } from 'modules/user/entities';
import { UtilsService } from 'utils/services';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void {

    if (event.entity.password) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void {

    if (event.entity?.password !== event.databaseEntity?.password) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }
}
