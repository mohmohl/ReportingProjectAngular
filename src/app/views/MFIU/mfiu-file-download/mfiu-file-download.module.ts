import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuFileDownloadComponent } from './mfiu-file-download.component';
import { MFIUFileDownloadRoutingModule } from './mfiu-file-download-routing.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MFIUFileDownloadRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MfiuFileDownloadComponent]
})
export class MFIUFileDownloadModule { }
