import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { MeterBillUploadComponent } from './meter-bill-upload.component';
import { MeterBillUploadRoutingModule } from './meter-bill-upload-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MeterBillUploadRoutingModule,
    SharedModule,
    //SearchFilterModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MeterBillUploadComponent]
})
export class MeterBillUploadModule { }