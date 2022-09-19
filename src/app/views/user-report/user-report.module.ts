import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { UserReportComponent } from './user-report.component';
import { UserReportRoutingModule } from './user-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserReportRoutingModule,
    SharedModule
  ],
  declarations: [UserReportComponent]
})
export class UserReportModule { }