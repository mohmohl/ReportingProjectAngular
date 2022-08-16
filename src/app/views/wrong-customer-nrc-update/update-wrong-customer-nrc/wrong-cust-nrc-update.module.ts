import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { WrongCustomerNRCUpdateComponent } from './wrong-cust-nrc-update.component';
import { WrongCustomerNRCUpdateRoutingModule } from './wrong-cust-nrc-update-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerSearchFilterModule } from '../search-filtering-dialog/cust-search-filter.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    WrongCustomerNRCUpdateRoutingModule,
    SharedModule,
    CustomerSearchFilterModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [WrongCustomerNRCUpdateComponent]
})
export class WrongCustomerNRCUpdateModule { }