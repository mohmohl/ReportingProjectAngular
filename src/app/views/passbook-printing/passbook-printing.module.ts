import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassbookPrintingRoutingModule } from './passbook-printing-routing.module';
import { PassbookPrintingComponent } from './passbook-printing.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PassbookPrintingComponent],
  imports: [
    SharedModule,
    CommonModule,
    PassbookPrintingRoutingModule
  ]
})
export class PassbookPrintingModule { }
