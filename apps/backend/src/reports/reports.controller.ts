import { Controller, Get } from '@nestjs/common';
import { type DashboardStat, type Report } from '@jeduardoes/shared';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getReports(): Report[] {
    return this.reportsService.getExecutiveReports();
  }

  @Get('metrics')
  getMetrics(): DashboardStat[] {
    return this.reportsService.getDashboardStats();
  }
}
