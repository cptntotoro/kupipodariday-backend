import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UserRequestInfo } from 'src/auth/auth-request';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../wishes/entities/wish.entity';
import { Repository } from 'typeorm';
import { OfferDto } from './dto/offer.dto';
import { TransformUtil } from '../utils/transform.util';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(
    createOfferDto: CreateOfferDto,
    userInfo: UserRequestInfo,
  ): Promise<OfferDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const wish = await this.wishRepository.findOne({
      where: { id: createOfferDto.itemId },
      relations: ['owner'],
    });
    if (!wish) throw new NotFoundException();
    if (wish.owner.id === userInfo.userId)
      throw new ForbiddenException('Cannot offer to own wish');
    if (wish.raised + createOfferDto.amount > wish.price)
      throw new UnprocessableEntityException('Offer exceeds price');

    const offer = await this.offerRepository.save({
      ...createOfferDto,
      user: { id: userInfo.userId },
      item: { id: createOfferDto.itemId },
    });
    await this.wishRepository.increment(
      { id: createOfferDto.itemId },
      'raised',
      createOfferDto.amount,
    );
    return TransformUtil.toDto(OfferDto, offer);
  }

  async findAll(userInfo: UserRequestInfo): Promise<OfferDto[]> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const offers = await this.offerRepository.find({
      where: { user: { id: userInfo.userId } },
      relations: ['item', 'user'],
    });
    return TransformUtil.toDtoArray(OfferDto, offers);
  }

  async findOne(id: number): Promise<OfferDto> {
    const offer = await this.offerRepository.findOne({
      where: { id: id },
      relations: ['item', 'user'],
    });
    if (!offer) throw new NotFoundException();
    return TransformUtil.toDto(OfferDto, offer);
  }
}
