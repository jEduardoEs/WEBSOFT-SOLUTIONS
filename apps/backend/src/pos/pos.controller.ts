import { Controller, Get, Query } from '@nestjs/common';
import { type Invoice, type Sale } from '@jeduardoes/shared';
import { PosService } from './pos.service';

@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Get('sales')
  getSales(@Query('status') status?: Sale['status']): Sale[] {
    return this.posService.getSales(status);
  }

  @Get('invoices')
  getInvoices(): Invoice[] {
    return this.posService.getInvoices();
  }
}
