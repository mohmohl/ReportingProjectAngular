import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuplicateChannelUserCheckerRoutingModule } from './duplicate-channel-user-checker-routing.module';
import { DuplicateChannelUserCheckerComponent } from './duplicate-channel-user-checker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [DuplicateChannelUserCheckerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    DuplicateChannelUserCheckerRoutingModule
  ]
})
export class DuplicateChannelUserCheckerModule { }
