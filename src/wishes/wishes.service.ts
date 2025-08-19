import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';
import { UserRequestInfo } from '../auth/auth-request';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WishDto } from './dto/wish.dto';
import { WishPartialDto } from './dto/wish-partial.dto';
import { TransformUtil } from '../utils/transform.util';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(
    createWishDto: CreateWishDto,
    userInfo: UserRequestInfo,
  ): Promise<WishDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const wish = await this.wishRepository.save({
      ...createWishDto,
      owner: { id: userInfo.userId },
    });
    return TransformUtil.toDto(WishDto, wish);
  }

  async findLast(): Promise<WishPartialDto[]> {
    const wishes = await this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: ['owner', 'offers'],
    });
    return TransformUtil.toDtoArray(WishPartialDto, wishes);
  }

  async findTop(): Promise<WishPartialDto[]> {
    const wishes = await this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 10,
      relations: ['owner', 'offers'],
    });
    return TransformUtil.toDtoArray(WishPartialDto, wishes);
  }

  async findOne(id: number, userInfo: UserRequestInfo): Promise<WishDto> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers'],
    });
    if (!wish) throw new NotFoundException();
    if (wish.owner.id !== userInfo?.userId) {
      wish.offers.forEach((value) => {
        if (value.hidden) {
          value.amount = 0;
        }
      });
    }
    return TransformUtil.toDto(WishDto, wish);
  }

  async update(
    id: number,
    updateWishDto: UpdateWishDto,
    userInfo: UserRequestInfo,
  ): Promise<WishDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const wish = await this.findOneCommon(id);
    if (wish.owner.id !== userInfo.userId)
      throw new ForbiddenException('Cannot update someone elses wish');
    if (wish.raised > 0 && updateWishDto.price != wish.price)
      throw new ForbiddenException(
        'Сant change the price if there are already participant willing to chip in',
      );
    await this.wishRepository.update({ id }, updateWishDto);
    return this.findOneCommon(id);
  }

  async removeOne(id: number, userInfo: UserRequestInfo): Promise<WishDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const wish = await this.findOneCommon(id);
    if (wish.owner.id !== userInfo.userId)
      throw new ForbiddenException('Cannot remove someone elses wish');
    await this.wishRepository.delete({ id });
    return wish;
  }

  async copyWish(id: number, userInfo: UserRequestInfo): Promise<WishDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const original = await this.findOneCommon(id);
    if (original.owner.id === userInfo.userId)
      throw new ForbiddenException('Cannot copy own wish');
    const copy = await this.wishRepository.save({
      name: original.name,
      link: original.link,
      image: original.image,
      price: original.price,
      description: original.description,
      owner: { id: userInfo.userId },
    });
    await this.wishRepository.increment({ id: original.id }, 'copied', 1);
    return TransformUtil.toDto(WishDto, copy);
  }

  private async findOneCommon(id: number): Promise<WishDto> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers'],
    });
    if (!wish) throw new NotFoundException();
    return TransformUtil.toDto(WishDto, wish);
  }
}
