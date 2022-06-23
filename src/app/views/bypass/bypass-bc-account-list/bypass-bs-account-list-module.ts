import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { ByPassBCAccountListRoutingModule} from './bypass-bc-account-list-routing.module';
import {BypassBcAccountListComponent } from './bypass-bc-account-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ByPassBCAccountListRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [BypassBcAccountListComponent]
})
export class ByPassBCAccountListModule { }