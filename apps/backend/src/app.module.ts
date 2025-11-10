import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { AppService } from './app.service';
import { CatalogController } from './catalog/catalog.controller';
import { CatalogService } from './catalog/catalog.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { PosController } from './pos/pos.controller';
import { PosService } from './pos/pos.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    OrdersController,
    CatalogController,
    UsersController,
    ReportsController,
    PosController,
  ],
  providers: [AppService, OrdersService, CatalogService, UsersService, ReportsService, PosService],
})
export class AppModule {}
