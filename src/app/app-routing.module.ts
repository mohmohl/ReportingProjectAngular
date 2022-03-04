import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import {AdminComponent} from './layouts/admin/admin.component';
import {AuthComponent} from './layouts/auth/auth.component';
import { SimplePageComponent } from './simple-page/simple-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
     /* {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },*/
      
     {
        path: 'home',
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule), canActivate:[AuthGuard]
      }, 
      {
        path: 'access-denied',
        loadChildren: () => import('./views/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
      }, 
      {
        path: 'search-user',
        loadChildren: () => import('./views/UserAccount/search-user/search-user.module').then(m => m.SearchUserModule),canActivate:[AuthGuard]
      }, 
      {
        path: 'user-registration/:userId',
        loadChildren: () => import('./views/UserAccount/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
      },
      {
        path: 'search-registered-user',
        loadChildren: () => import('./views/UserAccount/search-registered-user/user-permission.module').then(m => m.UserPermissionModule),canActivate:[AuthGuard]
      }, 
      {
        path: 'change-password',
        loadChildren: () => import('./views/change-password/change-password.module').then(m => m.ChangePasswordModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./views/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'ccsoutward',
        loadChildren: () => import('./views/ccs-report/ccsoutward/ccs-outward.module').then(m => m.CCSOutwardModule),canActivate:[AuthGuard]
      },
      {
         path: 'ccsinward',
         loadChildren: () => import('./views/ccs-report/ccsinward/ccs-inward.module').then(m => m.CCSInwardModule),canActivate:[AuthGuard]
      },
      {
        path: 'achoutward',
        loadChildren: () => import('./views/ach-report/achoutward/ach-outward.module').then(m => m.ACHOutwardModule)
      },
      {
         path: 'achinward',
         loadChildren: () => import('./views/ach-report/achinward/ach-inward.module').then(m => m.ACHInwardModule)
      },
      {
        path: 'bank-statement',
        loadChildren: () => import('./views/BankStatement/bank-statement.module').then(m => m.BankStatementModule)
      },
      {
        path: 'loanContract',
        loadChildren: () => import('./views/loan-contract/loan-contract.module').then(m => m.LoanContractModule),canActivate:[AuthGuard]
      },
      {
        path: 'mpuist',
        loadChildren: () => import('./views/mpuist/mpuist.module').then(m => m.MPUISTModule),canActivate:[AuthGuard]
      }
      ,
      {
        path: 'gt-trial-report',
        loadChildren: () => import('./views/TrialReport/detail-trial-report/trial-report.module').then(m => m.TrialReportModule),canActivate:[AuthGuard]
      },
      {
        path: 'general-trial-report',
        loadChildren: () => import('./views/TrialReport/general-trial-report/general-trial-report.module').then(m => m.GeneralTrialReportModule),canActivate:[AuthGuard]
      },
      {
        path: 'mis-trial-report',
        loadChildren: () => import('./views/TrialReport/mis-trial-report/mis-trial-report.module').then(m => m.MisTrialReportModule),canActivate:[AuthGuard]
      },
      {
        path: 'bypass-account-list',
        loadChildren: () => import('./views/bypass/bypass-account-list/bypass-account-list-module').then(m => m.ByPassAccountListModule),canActivate:[AuthGuard]
      },
      {
        path: 'bypass-new-account',
        loadChildren: () => import('./views/bypass/bypass-new-account/bypass-new-account-module').then(m => m.ByPassNewAccountModule),canActivate:[AuthGuard]
      },
      {
        path: 'bypass-edit-account/:param1',
        loadChildren: () => import('./views/bypass/bypass-edit-account/bypass-edit-account.module').then(m => m.ByPassEditAccountModule),canActivate:[AuthGuard]
      },
      {
        path: 'bank-statement-view',
        loadChildren: () => import('./views/bank-statement-view/bank-statement-view.module').then(m => m.BankStatementViewModule)
      },
      {
        path: 'deno-import',
        loadChildren: () => import('./views/Denomination/deno-import/deno-import.module').then(m => m.DenoImportModule)
      },
      {
        path: 'deno-report',
        loadChildren: () => import('./views/Denomination/deno-report/deno-report.module').then(m => m.DenoReportModule)
      },
      {
        path: 'mab-survey-question',
        loadChildren: () => import('./views/MABQA/mab-survey-question/mab-survey-question.module').then(m => m.MABSurveyQuestionModule)
      },
      {
        path: 'mab-survey-form',
        loadChildren: () => import('./views/MABQA/mab-question-answer/mab-question-answer.module').then(m => m.MABQuestionAnswerModule)
      },
      {
        path: 'mab-survey-report',
        loadChildren: () => import('./views/MABQA/mab-answer-view/mab-answer-view.module').then(m => m.MABAnswerViewModule)
      },
      {
        path: 'mab-survey-setting',
        loadChildren: () => import('./views/MABQA/mab-survey-setting/mab-survey-setting.module').then(m => m.MABSurveySettingModule)
      },
      {
        path: 'meter-bill-upload',
        loadChildren: () => import('./views/meterBill/metre-bill-upload/metre-bill-upload.module').then(m => m.MetreBillUploadModule)
      },
      {
        path: 'vendor-registration',
        loadChildren: () => import('./views/meterBill/vendor-registration/vendor-registration.module').then(m => m.VendorRegistrationModule)
      },
      {
        path: 'vendor-meter-bill-upload',
        loadChildren: () => import('./views/meterBill/vendor-meter-bill-upload/vendor-meter-bill-upload.module').then(m => m.VendorMetreBillUploadModule)
      },
      {
        path: 'report-generation',
        loadChildren: () => import('./views/meterBill/report-generation/report-generation.module').then(m => m.ReportGenerationModule)
      },
      {

        path: 'mmcb-data-upload',
        loadChildren: () => import('./views/mmcb-data-upload/mmcb-data-upload.module').then(m => m.MMCBDataUploadModule)
      },
      {
        path: 'mab-doc-upload',
        loadChildren: () => import('./views/mab-doc-upload/upload-doc/mab-doc-upload.module').then(m => m.MABDocUploadModule)
      },
      {
        path: 'mab-doc-view',
        loadChildren: () => import('./views/mab-doc-upload/view-doc/mab-doc-view.module').then(m => m.MABDocViewModule)
      },
      {
        path: 'mab-doc-view-management',
        loadChildren: () => import('./views/mab-doc-upload/view-doc-management/mab-doc-view-management.module').then(m => m.MABDocViewManagementModule)
      },

      {
        path: 'meter-bill-view',
        loadChildren: () => import('./views/meterBill/meter-bill-view/metre-bill-view.module').then(m => m.MetreBillViewModule)
      },
      {
        path: 'vendor-meter-bill-view',
        loadChildren: () => import('./views/meterBill/vendor-meter-bill-view/vendor-meter-bill-view.module').then(m => m.VendorMetreBillViewModule)
      },
      {
        path: 'delete-view',
        loadChildren: () => import('./views/meterBill/delete-view/delete-view.module').then(m => m.DeleteViewModule)
      },
      {
        path: 'accrual_domestic_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Accrual Domestic Daybook"}
      },
      {
        path: 'accrual_transfer_scroll',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Accrual Transfer Scroll"}
      },
      {
        path: 'bank_cash',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Bank Cash Scroll"}
      },
      {
        path: 'clean_cash',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Clean Cash Scroll"}
      },
      {
        path: 'current_account_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Current Account Daybook"}
      },
      {
        path: 'domestic_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Daybook Domestic"}
      },
      {
        path: 'detail_trial',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Detail Trial"}
      },
      {
        path: 'general_trial',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"General Trial"}
      },
      {
        path: 'od_account_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"OD Account Daybook"}
      },
      {
        path: 'transfer_scroll',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Transfer Scroll"}
      },
      {
        path: 'trial_sheet',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data :{param:"Trial Sheet"}
      },
      {
        path: 'bypass-new-bc-account',
        loadChildren: () => import('./views/bypass/bypass-new-bc-account/bypass-new-bc-account-module').then(m => m.ByPassNewBCAccountModule)
      },
      {
        path: 'bypass-bc-account-list',
        loadChildren: () => import('./views/bypass/bypass-bc-account-list/bypass-bs-account-list-module').then(m => m.ByPassBCAccountListModule)
      }


    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
