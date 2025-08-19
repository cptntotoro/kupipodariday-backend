import { Injectable } from '@nestjs/common';

@Injectable()
export class OffersService {
  getHello(): string {
    return 'Hello World!';
  }
}
