import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { MABDocUploadComponent } from './mab-doc-upload.component';
import { MABDocUploadRoutingModule } from './mab-doc-upload-routing.module';
import { SearchFilterModule } from '../search-filtering-dialog/search-filter.module';

@NgModule({
  imports: [
    CommonModule,
    MABDocUploadRoutingModule,
    SharedModule,
    SearchFilterModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MABDocUploadComponent]
})
export class MABDocUploadModule { }