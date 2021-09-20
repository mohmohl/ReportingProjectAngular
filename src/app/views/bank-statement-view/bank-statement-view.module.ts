import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { BankStatementViewRoutingModule} from './bank-statement-view-routing.module'; 
import {SharedModule} from '../../shared/shared.module';
import { BankStatementViewComponent } from '../bank-statement-view/bank-statement-view.component';

@NgModule({
  imports: [
    CommonModule,
    BankStatementViewRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [BankStatementViewComponent]
})
export class BankStatementViewModule { }