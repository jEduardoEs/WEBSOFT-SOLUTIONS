import { Controller, Get } from '@nestjs/common';
import type { Order } from '@jeduardoes/shared';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(): Order[] {
    return this.ordersService.getOrders();
  }
}
