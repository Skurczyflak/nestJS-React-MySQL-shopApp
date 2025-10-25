import { Module } from '@nestjs/common';
import { CartItemsController } from './cart-items.controller';
import { CartItemsService } from './cart-items.service';
import { PrismaService } from 'src/shared/prisma.service';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaService]
})
export class CartItemsModule {}
