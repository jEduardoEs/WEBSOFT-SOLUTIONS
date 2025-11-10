import { Injectable } from '@nestjs/common';
import {
  catalogProducts,
  catalogServices,
  companyProfile,
  rolePermissions,
  type Product,
  type RolePermission,
  type Service,
} from '@jeduardoes/shared';

interface LandingPayload {
  company: typeof companyProfile;
  featuredProducts: Product[];
  featuredServices: Service[];
  roles: RolePermission[];
}

@Injectable()
export class AppService {
  getHealth(): { status: string } {
    return { status: 'ok' };
  }

  getLanding(): LandingPayload {
    return {
      company: companyProfile,
      featuredProducts: catalogProducts.slice(0, 3),
      featuredServices: catalogServices.slice(0, 3),
      roles: rolePermissions,
    };
  }
}
