import { Controller, Get } from '@nestjs/common';
import { CrmService } from './crm.service';
import {
  type ActivityEntry,
  type CrmModule,
  type PortalFeature,
  type SalesGoal,
} from '@jeduardoes/shared';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get('overview')
  getOverview() {
    return this.crmService.getOverview();
  }

  @Get('modules')
  getModules(): CrmModule[] {
    return this.crmService.getModules();
  }

  @Get('portal-features')
  getPortalFeatures(): PortalFeature[] {
    return this.crmService.getPortalFeatures();
  }

  @Get('activity')
  getActivity(): ActivityEntry[] {
    return this.crmService.getActivity();
  }

  @Get('goals')
  getGoals(): SalesGoal[] {
    return this.crmService.getGoals();
  }
}
