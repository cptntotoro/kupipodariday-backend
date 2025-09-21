import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from '../wishes/entities/wish.entity';
import { UserRequestInfo } from 'src/auth/auth-request';
import { WishlistDto } from './dto/wishlist.dto';
import { TransformUtil } from '../utils/transform.util';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async findAll(): Promise<WishlistDto[]> {
    const wishlists = await this.wishlistRepository.find({
      relations: ['owner'],
    });
    return TransformUtil.toDtoArray(WishlistDto, wishlists);
  }

  async create(
    createWishlistDto: CreateWishlistDto,
    userInfo: UserRequestInfo,
  ): Promise<WishlistDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const items = createWishlistDto.itemsId.length
      ? await this.wishRepository.find({
          where: createWishlistDto.itemsId.map((id) => ({ id })),
        })
      : [];
    const wishlist = await this.wishlistRepository.save({
      name: createWishlistDto.name,
      image: createWishlistDto.image,
      owner: { id: userInfo.userId },
      items,
    });
    return TransformUtil.toDto(WishlistDto, wishlist);
  }

  async findOne(id: number): Promise<WishlistDto> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (!wishlist) throw new NotFoundException();
    return TransformUtil.toDto(WishlistDto, wishlist);
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userInfo: UserRequestInfo,
  ): Promise<WishlistDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const wishlist = await this.findOne(id);
    if (wishlist.owner.id !== userInfo.userId)
      throw new ForbiddenException('Cannot update someone elses wishlist');
    if (updateWishlistDto.itemsId) {
      const items = await this.wishRepository.find({
        where: updateWishlistDto.itemsId.map((id) => ({ id })),
      });
      await this.wishlistRepository.save({ id, items });
    }
    await this.wishlistRepository.update(
      { id },
      {
        name: updateWishlistDto.name,
        image: updateWishlistDto.image,
      },
    );
    return this.findOne(id);
  }

  async removeOne(id: number, userInfo: UserRequestInfo): Promise<WishlistDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const wishlist = await this.findOne(id);
    if (wishlist.owner.id !== userInfo.userId)
      throw new ForbiddenException('Cannot delete someone elses wishlist');
    await this.wishlistRepository.delete({ id });
    return wishlist;
  }
}
