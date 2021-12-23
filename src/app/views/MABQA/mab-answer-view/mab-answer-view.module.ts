import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import {MABAnswerViewComponent} from './mab-answer-view.component';
import {MABAnswerViewRoutingModule} from './mab-answer-view-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MABAnswerViewRoutingModule,
    SharedModule
  ],
  declarations: [MABAnswerViewComponent]
})
export class MABAnswerViewModule { }