import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { EOYIncomeRoutingModule } from './eoy-income-routing.module';
import { EOYIncomeComponent } from './eoy-income.component';


@NgModule({
  imports: [
    CommonModule,
    EOYIncomeRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [EOYIncomeComponent]
})
export class EOYIncomeModule { }