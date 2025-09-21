import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../auth/auth-request';
import { OfferDto } from './dto/offer.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@Controller('offers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Request() req: AuthRequest,
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<OfferDto> {
    return this.offersService.create(createOfferDto, req.user);
  }

  @Get()
  findAll(@Request() req: AuthRequest): Promise<OfferDto[]> {
    return this.offersService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OfferDto> {
    return this.offersService.findOne(parseInt(id));
  }
}
