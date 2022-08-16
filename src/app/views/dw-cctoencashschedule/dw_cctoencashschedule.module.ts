import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DWCCTOEncashScheduleRoutingModule } from './dw_cctoencashschedule-routing.module';
import { DwCctoencashscheduleComponent } from './dw-cctoencashschedule.component';

@NgModule({
  imports: [
    CommonModule,
    DWCCTOEncashScheduleRoutingModule,
    SharedModule
  ],
  declarations: [DwCctoencashscheduleComponent]
})
export class DWCCTOEncashScheduleModule { }