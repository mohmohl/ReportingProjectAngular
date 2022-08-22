import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicNewRoutingModule } from './topic-new-routing.module';
import { TopicNewComponent } from './topic-new.component';


@NgModule({
  declarations: [TopicNewComponent],
  imports: [
    CommonModule,
    TopicNewRoutingModule,
    SharedModule,
  ]
})
export class TopicNewModule { }
