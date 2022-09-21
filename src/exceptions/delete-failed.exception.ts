import { BadRequestException } from '@nestjs/common';

export class DeleteFailedException extends BadRequestException {
  constructor(error?: string) {
    super(error, 'error.delete_failed');
  }
}
