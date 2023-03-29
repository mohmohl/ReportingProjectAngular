import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { EOYExpenditureRoutingModule } from './eoy-expenditure-routing.module';
import { EOYExpenditureComponent } from './eoy-expenditure.component';

@NgModule({
  imports: [
    CommonModule,
    EOYExpenditureRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [EOYExpenditureComponent]
})
export class EOYExpenditureModule { }