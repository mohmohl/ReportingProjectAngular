import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { ByPassNewAccountRoutingModule} from './bypass-new-account-routing.module';
import {BypassNewAccountComponent } from './bypass-new-account.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ByPassNewAccountRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [BypassNewAccountComponent]
})
export class ByPassNewAccountModule { }