import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPDFRoutingModule} from './search-pdf-routing.module';
import {SearchPDFComponent } from './search-pdf.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SearchPDFRoutingModule,
    SharedModule
  ],
  declarations: [SearchPDFComponent]
})
export class SearchPDFModule { }