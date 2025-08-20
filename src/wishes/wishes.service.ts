import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  getHello(): string {
    return 'Hello World!';
  }

  create(createWishDto: CreateWishDto): void {
    return;
  }

  getLast(): Wish {
    return new Wish();
  }

  getTop(): Wish {
    return new Wish();
  }

  getById(id: number): Wish {
    return new Wish();
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return '';
  }

  deleteById(id: number): Wish {
    return new Wish();
  }

  duplicate(id: number): Wish {
    return new Wish();
  }
}
