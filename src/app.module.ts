import { Module,NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
      ProductsModule, 
      UsersModule, 
      CartItemsModule, 
      CartsModule, 
      OrdersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer):void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
