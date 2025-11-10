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
import { CrmController } from './crm/crm.controller';
import { CrmService } from './crm/crm.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { BillingController } from './billing/billing.controller';
import { BillingService } from './billing/billing.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    OrdersController,
    CatalogController,
    UsersController,
    ReportsController,
    PosController,
    CrmController,
    CustomersController,
    BillingController,
  ],
  providers: [
    AppService,
    OrdersService,
    CatalogService,
    UsersService,
    ReportsService,
    PosService,
    CrmService,
    CustomersService,
    BillingService,
  ],
})
export class AppModule {}
