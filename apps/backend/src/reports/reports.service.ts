import { Injectable } from '@nestjs/common';
import { dashboardStats, executiveReports, type DashboardStat, type Report } from '@jeduardoes/shared';

@Injectable()
export class ReportsService {
  getExecutiveReports(): Report[] {
    return executiveReports;
  }

  getDashboardStats(): DashboardStat[] {
    return dashboardStats;
  }
}
