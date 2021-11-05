import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import {DomesticNewCompanyComponent} from './domestic-new-company.component';
import {DomesticNewCompanyRoutingModule} from './domestic-new-company-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DomesticNewCompanyRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DomesticNewCompanyComponent]
})
export class DomesticNewCompanyModule { }