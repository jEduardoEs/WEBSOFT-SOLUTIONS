import { Injectable } from '@nestjs/common';
import { invoices, salesPipeline, type Invoice, type Sale } from '@jeduardoes/shared';

@Injectable()
export class PosService {
  getSales(status?: Sale['status']): Sale[] {
    if (!status) {
      return salesPipeline;
    }

    return salesPipeline.filter((sale) => sale.status === status);
  }

  getInvoices(): Invoice[] {
    return invoices;
  }
}
