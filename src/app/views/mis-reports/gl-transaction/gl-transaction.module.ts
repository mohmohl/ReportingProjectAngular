
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { GLTransactionComponent } from './gl-transaction.component';
import { GLTransactionRoutingModule } from './gl-transaction-routing.module';


@NgModule({
  declarations: [
    GLTransactionComponent
  ],
  imports: [
    CommonModule,
    GLTransactionRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class GLTransactionModule { }
