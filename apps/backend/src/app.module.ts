import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrdersService],
})
export class AppModule {}
