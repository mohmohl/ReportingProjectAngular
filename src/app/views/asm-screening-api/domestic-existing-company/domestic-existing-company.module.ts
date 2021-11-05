import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import {DomesticExistingCompanyComponent} from './domestic-existing-company.component';
import {DomesticExistingCompanyRoutingModule} from './domestic-existing-company-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DomesticExistingCompanyRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DomesticExistingCompanyComponent]
})
export class DomesticExistingCompanyModule { }