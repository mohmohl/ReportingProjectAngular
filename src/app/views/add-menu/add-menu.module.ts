import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddMenuRoutingModule } from './add-menu-routing.module';
import { AddMenuComponent } from './add-menu.component';


@NgModule({
  imports: [
    CommonModule,
    AddMenuRoutingModule,
    SharedModule
  ],
  declarations: [AddMenuComponent]
})
export class AddMenuModule { }