import { Injectable } from '@nestjs/common';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {

  /**
   * Получить все списки желаний пользователя
   */
  findAll(): Wishlist[] {
    return new Wishlist[];
  }

  /**
   * Создать новый список желаний
   * @param createWishlistDto
   */
  create(createWishlistDto: CreateWishlistDto): Wishlist {
    return new Wishlist;
  }

  /**
   * Получить список желаний по идентификатору
   * @param id Идентификатор
   */
  getById(id: number): Wishlist {
    return new Wishlist;
  }

  /**
   * Обновить список желаний по идентификатору
   * @param id Идентификатор
   * @param updateWishlistDto Новый список желаний
   */
  update(id: number, updateWishlistDto: UpdateWishlistDto): Wishlist {
    return new Wishlist;
  }

  /**
   * Удалить список желаний по идентификатору
   * @param id Идентификатор
   */
  delete(id: number): Wishlist {
    return new Wishlist;
  }
}
