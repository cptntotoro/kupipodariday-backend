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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createWishDto: CreateWishDto): void {
    return this.wishesService.create(createWishDto);
  }

  @Get('last')
  getLast(): string {
    return this.wishesService.getLast();
  }

  @Get('top')
  getTop(): string {
    return this.wishesService.getTop();
  }

  @Get(':id')
  getById(@Param('id') id: number): string {
    return this.wishesService.getById(id);
  }

  // TODO: нет в сваггере. Мб вернуть объект???
  @Patch(':id')
  updateById(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    // @Res() wish: Wish,
  ): string {
    return this.wishesService.update(id, updateWishDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): string {
    return this.wishesService.deleteById(id);
  }

  @Post(':id/copy')
  @HttpCode(201)
  duplicate(@Param('id') id: number): string {
    return this.wishesService.duplicate(id);
  }
}
