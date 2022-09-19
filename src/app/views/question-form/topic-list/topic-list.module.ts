import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicListRoutingModule } from './topic-list-routing.module';
import { TopicListComponent } from './topic-list.component';


@NgModule({
  declarations: [TopicListComponent],
  imports: [
    CommonModule,
    TopicListRoutingModule
  ]
})
export class TopicListModule { }
