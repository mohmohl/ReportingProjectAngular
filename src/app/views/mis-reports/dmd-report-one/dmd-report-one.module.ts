import { DmdReportOneComponent } from './dmd-report-one.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DmdReportOneRoutingModule } from './dmd-report-one-routing.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DmdReportOneComponent
  ],
  imports: [
    CommonModule,
    DmdReportOneRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class DmdReportOneModule { }
