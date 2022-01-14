import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { ByPassNewBCAccountRoutingModule} from './bypass-new-bc-account-routing.module';
import {BypassNewBcAccountComponent } from './bypass-new-bc-account.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ByPassNewBCAccountRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [BypassNewBcAccountComponent]
})
export class ByPassNewBCAccountModule { }