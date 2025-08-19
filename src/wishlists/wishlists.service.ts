import { Injectable } from '@nestjs/common';

@Injectable()
export class WishlistsService {
  getHello(): string {
    return 'Hello World!';
  }
}
