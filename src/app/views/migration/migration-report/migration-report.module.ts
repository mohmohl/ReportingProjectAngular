import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MigrationReportComponent } from './migration-report.component';
import { MigrationReportRoutingModule } from './migration-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MigrationReportRoutingModule,
    SharedModule
  ],
  declarations: [MigrationReportComponent]
})
export class MigrationReportModule { }
