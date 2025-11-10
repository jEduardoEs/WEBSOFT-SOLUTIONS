import { Injectable } from '@nestjs/common';
import {
  customerAccounts,
  supportTickets,
  type CustomerAccount,
  type SupportTicket,
} from '@jeduardoes/shared';

@Injectable()
export class CustomersService {
  getCustomers(): CustomerAccount[] {
    return customerAccounts;
  }

  getActiveCustomers(): CustomerAccount[] {
    return customerAccounts.filter((customer) => customer.status === 'active');
  }

  getSupportTickets(): SupportTicket[] {
    return supportTickets;
  }
}
