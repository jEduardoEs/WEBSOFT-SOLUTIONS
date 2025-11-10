import { Injectable } from '@nestjs/common';
import {
  activityTimeline,
  crmModules,
  customerPortalFeatures,
  dashboardStats,
  salesGoals,
  type ActivityEntry,
  type CrmModule,
  type PortalFeature,
  type SalesGoal,
} from '@jeduardoes/shared';

interface CrmOverview {
  modules: CrmModule[];
  stats: typeof dashboardStats;
  goals: SalesGoal[];
  latestActivities: ActivityEntry[];
}

@Injectable()
export class CrmService {
  getModules(): CrmModule[] {
    return crmModules;
  }

  getPortalFeatures(): PortalFeature[] {
    return customerPortalFeatures;
  }

  getActivity(): ActivityEntry[] {
    return activityTimeline;
  }

  getGoals(): SalesGoal[] {
    return salesGoals;
  }

  getOverview(): CrmOverview {
    return {
      modules: this.getModules(),
      stats: dashboardStats,
      goals: this.getGoals(),
      latestActivities: this.getActivity().slice(0, 4),
    };
  }
}
