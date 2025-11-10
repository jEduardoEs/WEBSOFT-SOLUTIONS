import { Injectable } from '@nestjs/common';
import { sampleOrders, type Order } from '@jeduardoes/shared';

@Injectable()
export class OrdersService {
  getOrders(): Order[] {
    return sampleOrders;
  }
}
