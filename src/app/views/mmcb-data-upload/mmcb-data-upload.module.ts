import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MMCBDataUploadRoutingModule} from './mmcb-data-upload-routing.module';
import {MMCBDataUploadComponent } from './mmcb-data-upload.component';
import {SharedModule} from '../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MMCBDataUploadRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MMCBDataUploadComponent]
})
export class MMCBDataUploadModule { }