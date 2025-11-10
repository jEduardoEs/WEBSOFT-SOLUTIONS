import { Injectable } from '@nestjs/common';
import { catalogProducts, catalogServices, type Product, type Service } from '@jeduardoes/shared';

@Injectable()
export class CatalogService {
  getProducts(): Product[] {
    return catalogProducts;
  }

  getServices(): Service[] {
    return catalogServices;
  }
}
