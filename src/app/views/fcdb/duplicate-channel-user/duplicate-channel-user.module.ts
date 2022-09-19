import { DuplicateChannelUserComponent } from './duplicate-channel-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuplicateChannelUserRoutingModule } from './duplicate-channel-user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    DuplicateChannelUserComponent
  ],
  imports: [
    CommonModule,
    DuplicateChannelUserRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class DuplicateChannelUserModule { }
