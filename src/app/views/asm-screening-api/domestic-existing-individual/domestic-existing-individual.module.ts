import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import {DomesticExistingIndividualComponent} from './domestic-existing-individual.component';
import {DomesticExistingIndividualRoutingModule} from './domestic-existing-individual-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DomesticExistingIndividualRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DomesticExistingIndividualComponent]
})
export class DomesticExistingIndividualModule { }