import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../auth/auth-request';
import { WishlistDto } from './dto/wishlist.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@Controller('wishlistlists')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll(): Promise<WishlistDto[]> {
    return this.wishlistsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Request() req: AuthRequest,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistDto> {
    return this.wishlistsService.create(createWishlistDto, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<WishlistDto> {
    return this.wishlistsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Request() req: AuthRequest,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<WishlistDto> {
    return this.wishlistsService.update(id, updateWishlistDto, req.user);
  }

  @Delete(':id')
  removeOne(
    @Request() req: AuthRequest,
    @Param('id') id: number,
  ): Promise<WishlistDto> {
    return this.wishlistsService.removeOne(id, req.user);
  }
}
