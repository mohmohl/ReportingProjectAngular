import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { ConsoExpenditureRoutingModule } from './conso-expenditure-routing.module';
import { ConsoExpenditureComponent } from './conso-expenditure.component';



@NgModule({
  imports: [
    CommonModule,
    ConsoExpenditureRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ConsoExpenditureComponent]
})
export class ConsoExpenditureModule { }