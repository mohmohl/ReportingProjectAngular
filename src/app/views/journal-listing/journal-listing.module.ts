import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { JournalListingRoutingModule } from './journal-listing-routing.module';
import { JournalListingComponent } from './journal-listing.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    JournalListingRoutingModule,
    SharedModule,
    MaterialModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [JournalListingComponent]
})
export class JournalListingModule { }