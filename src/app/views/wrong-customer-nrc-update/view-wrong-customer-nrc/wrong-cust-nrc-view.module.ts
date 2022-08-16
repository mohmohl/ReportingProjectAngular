import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { WrongCustomerNRCViewComponent } from './wrong-cust-nrc-view.component';
import { WrongCustomerNRCViewRoutingModule } from './wrong-cust-nrc-view-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WrongCustomerNRCViewRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [WrongCustomerNRCViewComponent]
})
export class WrongCustomerNRCViewModule { }