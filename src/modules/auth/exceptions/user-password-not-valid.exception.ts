import { ForbiddenException } from '@nestjs/common';

export class UserPasswordNotValidException extends ForbiddenException {
  constructor(error?: string) {
    super(error, 'error.email_or_password_not_valid');
  }
}
