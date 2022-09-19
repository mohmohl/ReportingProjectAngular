import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { ConsoIncomeRoutingModule } from './conso-income-routing.module';
import { ConsoIncomeComponent } from './conso-income.component';



@NgModule({
  imports: [
    CommonModule,
    ConsoIncomeRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ConsoIncomeComponent]
})
export class ConsoIncomeModule { }