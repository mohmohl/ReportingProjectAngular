import { CheckSumComponent } from './check-sum.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckSumRoutingModule } from './check-sum-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CheckSumComponent,
  ],
  imports: [
    CommonModule,
    CheckSumRoutingModule,
    SharedModule,
  ]
})
export class CheckSumModule { }
