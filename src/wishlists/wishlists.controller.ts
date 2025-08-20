import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('users')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll(): string {
    return this.wishlistsService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createWishlistDto: CreateWishlistDto): string {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Get(':id')
  getById(@Param('id') id: number): string {
    return this.wishlistsService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): string {
    return this.wishlistsService.update(id, updateWishlistDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): string {
    return this.wishlistsService.delete(id);
  }
}
