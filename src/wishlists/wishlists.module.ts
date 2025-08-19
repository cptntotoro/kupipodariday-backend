import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';

@Module({
  imports: [],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
