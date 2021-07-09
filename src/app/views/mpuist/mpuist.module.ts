import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MPUISTRoutingModule} from './mpuist-routing.module';
import { MpuistComponent } from './mpuist.component';
import {SharedModule} from '../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MPUISTService } from '../../../services/MPUISTService';

@NgModule({
  imports: [
    CommonModule,
    MPUISTRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MpuistComponent
  ],
  providers:[MPUISTService]
})
export class MPUISTModule { }