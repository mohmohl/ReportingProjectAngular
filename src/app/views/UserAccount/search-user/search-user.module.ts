import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchUserRoutingModule} from './search-user-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { SearchUserComponent } from './search-user.component';

@NgModule({
  imports: [
    CommonModule,
    SearchUserRoutingModule,
    SharedModule
  ],
  declarations: [SearchUserComponent]
})
export class SearchUserModule { }