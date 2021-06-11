import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { AuthComponent } from './layouts/auth/auth.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/helpers/error.interceptor';
import { SearchPDFComponent } from './views/search-pdf/search-pdf.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { CcsoutwardComponent } from './views/ccs-report/ccsoutward/ccsoutward.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { CCSReportService } from '../services/CCSReportService';
 


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,
    BreadcrumbsComponent,
    AuthComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CCSReportService,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
