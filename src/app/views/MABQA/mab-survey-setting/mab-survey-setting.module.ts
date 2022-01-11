import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import {MabSurveySettingComponent} from './mab-survey-setting.component';
import {MABSurveySettingRoutingModule} from './mab-survey-setting-routing.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MABSurveySettingRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MabSurveySettingComponent]
})
export class MABSurveySettingModule { }