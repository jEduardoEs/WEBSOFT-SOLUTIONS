import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { type CustomerAccount, type SupportTicket } from '@jeduardoes/shared';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getCustomers(): CustomerAccount[] {
    return this.customersService.getCustomers();
  }

  @Get('active')
  getActiveCustomers(): CustomerAccount[] {
    return this.customersService.getActiveCustomers();
  }

  @Get('support-tickets')
  getSupportTickets(): SupportTicket[] {
    return this.customersService.getSupportTickets();
  }
}
