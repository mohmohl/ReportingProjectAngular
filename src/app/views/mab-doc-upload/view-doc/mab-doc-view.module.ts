import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { MABDocViewComponent } from './mab-doc-view.component';
import { MABDocViewRoutingModule } from './mab-doc-view-routing.module';
import { SearchFilterModule } from '../search-filtering-dialog/search-filter.module';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';


@NgModule({
  imports: [
    CommonModule,
    MABDocViewRoutingModule,
    SharedModule,
    SearchFilterModule,
    ConfirmDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MABDocViewComponent]
})
export class MABDocViewModule { }