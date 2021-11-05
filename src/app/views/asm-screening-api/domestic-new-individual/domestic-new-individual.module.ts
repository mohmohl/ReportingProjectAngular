import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import {DomesticNewIndividualComponent} from './domestic-new-individual.component';
import {DomesticNewIndividualRoutingModule} from './domestic-new-individual-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DomesticNewIndividualRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DomesticNewIndividualComponent]
})
export class DomesticNewIndividualModule { }