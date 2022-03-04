import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCategoryRoutingModule } from './add-category-routing.module';
import { AddCategoryComponent } from './add-category.component';


@NgModule({
  imports: [
    CommonModule,
    AddCategoryRoutingModule,
    SharedModule
  ],
  declarations: [AddCategoryComponent]
})
export class AddCategoryModule { }