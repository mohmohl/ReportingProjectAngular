import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

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
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule), canActivate: [AuthGuard]
      },
      {
        path: 'access-denied',
        loadChildren: () => import('./views/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
      },
      {
        path: 'search-user',
        loadChildren: () => import('./views/UserAccount/search-user/search-user.module').then(m => m.SearchUserModule), canActivate: [AuthGuard]
      },
      {
        path: 'manage-role',
        loadChildren: () => import('./views/UserAccount/manage-role/manage-role.moudle').then(m => m.ManageRoleModule)
      },
      {
        path: 'role-setup',
        loadChildren: () => import('./views/UserAccount/role-setup/role-setup.moudle').then(m => m.RoleSetupModule)
      },
      {
        path: 'user-registration',
        loadChildren: () => import('./views/UserAccount/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
      },
      {
        path: 'search-registered-user',
        loadChildren: () => import('./views/UserAccount/search-registered-user/user-permission.module').then(m => m.UserPermissionModule), canActivate: [AuthGuard]
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
        loadChildren: () => import('./views/ccs-report/ccsoutward/ccs-outward.module').then(m => m.CCSOutwardModule), canActivate: [AuthGuard]
      },
      {
        path: 'ccsinward',
        loadChildren: () => import('./views/ccs-report/ccsinward/ccs-inward.module').then(m => m.CCSInwardModule), canActivate: [AuthGuard]
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
        loadChildren: () => import('./views/loan-contract/loan-contract.module').then(m => m.LoanContractModule), canActivate: [AuthGuard]
      },
      {
        path: 'mpuist',
        loadChildren: () => import('./views/mpuist/mpuist.module').then(m => m.MPUISTModule), canActivate: [AuthGuard]
      }
      ,
      {
        path: 'gt-detail-trial-report',
        loadChildren: () => import('./views/TrialReport/detail-trial-report/trial-report.module').then(m => m.TrialReportModule), canActivate: [AuthGuard]
      },
      {
        path: 'general-trial-report',
        loadChildren: () => import('./views/TrialReport/general-trial-report/general-trial-report.module').then(m => m.GeneralTrialReportModule), canActivate: [AuthGuard]
      },
      {
        path: 'mis-trial-report',
        loadChildren: () => import('./views/TrialReport/mis-trial-report/mis-trial-report.module').then(m => m.MisTrialReportModule), canActivate: [AuthGuard]
      },
      {
        path: 'bypass-account-list',
        loadChildren: () => import('./views/bypass/bypass-account-list/bypass-account-list-module').then(m => m.ByPassAccountListModule), canActivate: [AuthGuard]
      },
      {
        path: 'bypass-new-account',
        loadChildren: () => import('./views/bypass/bypass-new-account/bypass-new-account-module').then(m => m.ByPassNewAccountModule), canActivate: [AuthGuard]
      },
      {
        path: 'bypass-edit-account/:param1',
        loadChildren: () => import('./views/bypass/bypass-edit-account/bypass-edit-account.module').then(m => m.ByPassEditAccountModule), canActivate: [AuthGuard]
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
        data: { param: "Accrual Domestic Daybook" }
      },
      {
        path: 'accrual_transfer_scroll',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Accrual Transfer Scroll" }
      },
      {
        path: 'bank_cash',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Bank Cash Scroll" }
      },
      {
        path: 'clean_cash',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Clean Cash Scroll" }
      },
      {
        path: 'current_account_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Current Account Daybook" }
      },
      {
        path: 'domestic_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Daybook Domestic" }
      },
      {
        path: 'detail_trial',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Detail Trial" }
      },
      {
        path: 'general_trial',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "General Trial" }
      },
      {
        path: 'od_account_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "OD Account Daybook" }
      },
      {
        path: 'transfer_scroll',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Transfer Scroll" }
      },
      {
        path: 'trial_sheet',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Trial Sheet" }
      },
      {
        path: 'bypass-new-bc-account',
        loadChildren: () => import('./views/bypass/bypass-new-bc-account/bypass-new-bc-account-module').then(m => m.ByPassNewBCAccountModule)
      },
      {
        path: 'bypass-bc-account-list',
        loadChildren: () => import('./views/bypass/bypass-bc-account-list/bypass-bs-account-list-module').then(m => m.ByPassBCAccountListModule)
      },
      {
        path: 'auth-forgot-password',
        loadChildren: () => import('./views/auth-forgot-password/auth-forgot-password.module').then(m => m.AuthForgotPasswordModule)
      },
      {
        path: 'add-menu',
        loadChildren: () => import('./views/add-menu/add-menu.module').then(m => m.AddMenuModule)
      },
      {
        path: 'add-category',
        loadChildren: () => import('./views/add-category/add-category.module').then(m => m.AddCategoryModule)
      },
      {

        path: 'user_manual',
        loadChildren: () => import('./views/user-manual/user-manual/user-manual.module').then(m => m.UserManualModule)
      },
      {
        path: 'subsidaryledger',
        loadChildren: () => import('./views/dw-subsiledger/dw_subsiledger.module').then(m => m.DWSubsiLedgerModule)
      },
      {
        path: 'domesticftransfer',
        loadChildren: () => import('./views/dw-domesticsfundtransfer/dw_domesticsfundtransfer.module').then(m => m.DWDomesticsFundTransferModule)
      },
      {
        path: 'domesticftransferreversal',
        loadChildren: () => import('./views/dw-domestictransferreversal/dw_domestictransferreversal.module').then(m => m.DWDomesticTransferReversalModule)
      }
      ,
      {
        path: 'file-directory',
        loadChildren: () => import('./views/user-manual/settings1/settings1.module').then(m => m.Settings1Module)
      },
      {
        path: 'role',
        loadChildren: () => import('./views/user-manual/settings2/settings2.module').then(m => m.Settings2Module)
      },
      {
        path: 'duplicate-channel-user',
        loadChildren: () => import('./views/fcdb/duplicate-channel-user/duplicate-channel-user.module').then(m => m.DuplicateChannelUserModule), canActivate: [AuthGuard]
      },
      {
        path: 'duplicate-channel-user-checker',
        loadChildren: () => import('./views/fcdb/duplicate-channel-user-checker/duplicate-channel-user-checker.module').then(m => m.DuplicateChannelUserCheckerModule), canActivate: [AuthGuard]
      },
      {
        path: 'fcdb-new-user',
        loadChildren: () => import('./views/fcdb/fcdb-new-user/fcdb-new-user.module').then(m => m.FcdbNewUserModule), canActivate: [AuthGuard]
      },
      {
        path: 'dailyftransfer',
        loadChildren: () => import('./views/dw-dailyfundtransfer/dw_dailyfundtransfer.module').then(m => m.DWDailyFundTransferModule)
      },
      {
        path: 'crossccytransfer',
        loadChildren: () => import('./views/dw-cctransfer/dw_cctransfer.module').then(m => m.DWCCTransferModule)
      },
      {
        path: 'obrencashccsi',
        loadChildren: () => import('./views/dw-obrencashccsi/dw_obrencashccsi.module').then(m => m.DWOBREncashCCSIModule)
      },
      {
        path: 'cctodrawing',
        loadChildren: () => import('./views/dw-cctodrawing/dw_cctodrawing.module').then(m => m.DWCCTODrawingModule)
      },
      {
        path: 'cctodrawingreversal',
        loadChildren: () => import('./views/dw-cctodrawingreversal/dw_cctodrawingreversal.module').then(m => m.DWCCTODrawingReversalModule)
      },
      {
        path: 'obrencashfpti',
        loadChildren: () => import('./views/dw-obrencashfpti/dw_obrencashfpti.module').then(m => m.DWOBREncashFPTIModule)
      },
      {

        path: 'cctoencash',
        loadChildren: () => import('./views/dw-cctoencashschedule/dw_cctoencashschedule.module').then(m => m.DWCCTOEncashScheduleModule)
      },
      {
        path: 'obrencashment',
        loadChildren: () => import('./views/dw-obrencashment/dw_obrencashment.module').then(m => m.DWObrEncashmentModule)
      },
      {
        path: 'obrencashtransfer',
        loadChildren: () => import('./views/dw-obrencashtransfer/dw_obrencashtransfer.module').then(m => m.DWObrEncashTransferModule)
      },
      {
        path: 'rmtobrdrawing',
        loadChildren: () => import('./views/dw-rmtobrdrawing/dw_rmtobrdrawing.module').then(m => m.DWRMTOBRDrawingModule)
      },
      {
        path: 'rmtobrencash',
        loadChildren: () => import('./views/dw-rmtobrencash/dw_rmtobrencash.module').then(m => m.DWRMTOBREncashModule)
      },
      {
        path: 'remittance',
        loadChildren: () => import('./views/dw-remittance/dw_remittance.module').then(m => m.DWRemittanceModule)
      },
      {
        path: 'incomingmt103',
        loadChildren: () => import('./views/dw-incomingmt103/dw_incomingmt103.module').then(m => m.DWIncomingMT103Module)
      },
      {
        path: 'outgoingmt103',
        loadChildren: () => import('./views/dw-outgoingmt103/dw_outgoingmt103.module').then(m => m.DWOutgoingMT103Module)
      }, {
        path: 'user-branch-setup',
        loadChildren: () => import('./views/user-branch-setup/user-branch-setup.module').then(m => m.UserBranchSetupModule)
      },
      {
        path: 'active-user-home-branch-report',
        loadChildren: () => import('./views/bs-user-home-branch-report/bs-user-home-branch-report.module').then(m => m.BsUserHomeBranchReportModule)
      },
      // {
      //   path: 'active-user-report',
      //   loadChildren: () => import('./views/bs-user-report/bs-user-report.module').then(m => m.BsUserReportModule)
      // }
      {
        path: 'clink-export-report',
        loadChildren: () => import('./views/clink-export/clink-export.module').then(m => m.CLinkExportModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
