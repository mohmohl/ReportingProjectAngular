import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuDataCheckingComponent } from './mfiu-data-checking.component';
import { MFIUDataCheckingRoutingModule } from './mfiu-data-checking-routing.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MFIUDataCheckingRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MfiuDataCheckingComponent]
})
export class MFIUDataCheckingModule { }
