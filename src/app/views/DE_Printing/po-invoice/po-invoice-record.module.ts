import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoInvoiceRoutingModule } from './po-invoice-record-routing.module';
import { PoInvoiceComponent } from './po-invoice-record.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PoInvoiceRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [PoInvoiceComponent]
})
export class PoInvoiceModule { }