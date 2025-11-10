import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { type BillingSummary, type Invoice } from '@jeduardoes/shared';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('summary')
  getSummary(): BillingSummary[] {
    return this.billingService.getSummary();
  }

  @Get('invoices')
  getInvoices(): Invoice[] {
    return this.billingService.getInvoices();
  }

  @Get('overview')
  getOverview() {
    return this.billingService.getOverview();
  }
}
