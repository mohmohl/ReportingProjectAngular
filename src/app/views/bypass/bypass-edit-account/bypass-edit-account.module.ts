import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { ByPassEditAccountRoutingModule} from './bypass-edit-account-routing.module';
import {BypassEditAccountComponent} from './bypass-edit-account.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ByPassEditAccountRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [BypassEditAccountComponent]
})
export class ByPassEditAccountModule { }