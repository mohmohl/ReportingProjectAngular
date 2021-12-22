import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { DeleteViewComponent } from './delete-view.component';
import { DeleteViewRoutingModule } from './delete-view-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DeleteViewRoutingModule,
    SharedModule
  ],
  declarations: [DeleteViewComponent]
})
export class DeleteViewModule { }
