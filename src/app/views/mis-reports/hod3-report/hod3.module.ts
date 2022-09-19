import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { HOD3RoutingModule } from './hod3-routing.module';
import { Hod3ReportComponent } from './hod3-report.component';



@NgModule({
  imports: [
    CommonModule,
    HOD3RoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [Hod3ReportComponent]
})
export class HOD3Module { }