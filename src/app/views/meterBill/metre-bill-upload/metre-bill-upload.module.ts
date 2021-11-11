import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetreBillUploadRoutingModule } from './metre-bill-upload-routing.module';
import { MetreBillUploadComponent } from './metre-bill-upload.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MetreBillUploadRoutingModule,
    SharedModule
  ],
  declarations: [MetreBillUploadComponent]
})
export class MetreBillUploadModule { }
