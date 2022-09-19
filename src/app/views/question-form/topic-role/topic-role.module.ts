import { TopicRoleComponent } from './topic-role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoleRoutingModule } from './topic-role-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TopicRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TopicRoleRoutingModule
  ]
})
export class TopicRoleModule { }
