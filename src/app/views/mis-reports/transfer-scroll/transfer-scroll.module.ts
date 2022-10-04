import { TransferScrollComponent } from './transfer-scroll.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferScrollRoutingModule } from './transfer-scroll-routing.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TransferScrollComponent
  ],
  imports: [
    CommonModule,
    TransferScrollRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class TransferScrollModule { }
