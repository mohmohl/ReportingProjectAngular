import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const materialModule = [
   MatAutocompleteModule
 ];

@NgModule({
  exports: [
    materialModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
