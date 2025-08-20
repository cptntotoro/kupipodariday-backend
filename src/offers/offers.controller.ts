import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('users')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getAll(): string {
    return this.offersService.getAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createOfferDto: CreateOfferDto): string {
    return this.offersService.create(createOfferDto);
  }

  @Get(':id')
  get(@Param('id') id: number): string {
    return this.offersService.get(id);
  }
}
