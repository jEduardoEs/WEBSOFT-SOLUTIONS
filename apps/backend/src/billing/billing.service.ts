import { Injectable } from '@nestjs/common';
import {
  billingSummaries,
  invoices,
  type BillingSummary,
  type Invoice,
} from '@jeduardoes/shared';

interface BillingOverview {
  summary: BillingSummary[];
  invoices: Invoice[];
}

@Injectable()
export class BillingService {
  getSummary(): BillingSummary[] {
    return billingSummaries;
  }

  getInvoices(): Invoice[] {
    return invoices;
  }

  getOverview(): BillingOverview {
    return {
      summary: this.getSummary(),
      invoices: this.getInvoices(),
    };
  }
}
