import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { BankStatementRoutingModule} from './bank-statement-routing.module';
import {BankStatementComponent } from './bank-statement.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BankStatementRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [BankStatementComponent]
})
export class BankStatementModule { }