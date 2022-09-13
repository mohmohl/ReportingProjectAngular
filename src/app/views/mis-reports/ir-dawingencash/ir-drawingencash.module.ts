import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { IRDrawingEncashReportRoutingModule } from './ir-drawingencash-routing.module';
import { IrDawingencashComponent } from './ir-dawingencash.component';


@NgModule({
  imports: [
    CommonModule,
    IRDrawingEncashReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [IrDawingencashComponent]
})
export class IRDrawingEncashReportModule { }