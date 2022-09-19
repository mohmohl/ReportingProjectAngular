import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { HOD2RoutingModule } from './hod2-routing.module';
import { Hod2ReportComponent } from './hod2-report.component';



@NgModule({
  imports: [
    CommonModule,
    HOD2RoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [Hod2ReportComponent]
})
export class HOD2Module { }