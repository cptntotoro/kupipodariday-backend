import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  /**
   * Создать желание
   * @param createWishDto Новое желание
   */
  create(createWishDto: CreateWishDto): void {
    return;
  }

  /**
   * Получить последнее желание
   */
  getLast(): Wish {
    return new Wish();
  }

  /**
   * Получить самое популярное желание
   */
  getTop(): Wish {
    return new Wish();
  }

  /**
   * Получить желание по идентификатору
   * @param id Идентификатор
   */
  getById(id: number): Wish {
    return new Wish();
  }

  /**
   * Обновить желание по идентификатору
   * @param id Идентификатор
   * @param updateWishDto Обновленное желание
   */
  update(id: number, updateWishDto: UpdateWishDto) {
    return '';
  }

  /**
   * Удалить желание по идентификатору
   * @param id Идентификатор
   */
  deleteById(id: number): Wish {
    return new Wish();
  }

  /**
   * Создать дубликат жеалания
   * @param id Идентификатор дублируемого желания
   */
  duplicate(id: number): Wish {
    return new Wish();
  }
}
