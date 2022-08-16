import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { Hod2ReportComponent } from './hod2-report.component';
import { Hod2ReportRoutingModule } from './hod2-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Hod2ReportRoutingModule,
    SharedModule
  ],
  declarations: [Hod2ReportComponent]
})
export class Hod2ReportModule { }