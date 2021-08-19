import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenExpiredRoutingModule} from './token-ecpired-routing.module';
import {TokenExpiredComponent } from './token-expired.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TokenExpiredRoutingModule,
    SharedModule
  ],
  declarations: [TokenExpiredComponent]
})
export class TokenExpiredModule { }