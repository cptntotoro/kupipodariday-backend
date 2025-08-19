import { Injectable } from '@nestjs/common';

@Injectable()
export class WishesService {
  getHello(): string {
    return 'Hello World!';
  }
}
