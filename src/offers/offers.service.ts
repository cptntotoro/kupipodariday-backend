import { Injectable } from '@nestjs/common';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  /**
   * Получить все предложения
   */
  getAll(): Offer[]{
    return new Offer[];
  }

  /**
   * Создать предложение
   * @param createOfferDto Новое предложение
   */
  create(createOfferDto: CreateOfferDto): Offer {
    return new Offer;
  }

  /**
   * Получить предложение по идентификатору
   * @param id Идентификатор
   */
  get(id: number): Offer {
    return new Offer;
  }
}
