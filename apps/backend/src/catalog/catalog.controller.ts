import { Controller, Get } from '@nestjs/common';
import { type Product, type Service } from '@jeduardoes/shared';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('products')
  getProducts(): Product[] {
    return this.catalogService.getProducts();
  }

  @Get('services')
  getServices(): Service[] {
    return this.catalogService.getServices();
  }
}
