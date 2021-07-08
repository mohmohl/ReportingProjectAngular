import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CCS_REPORT } from 'src/models/CCS_REPORT';
import { CCSReportService } from '../../../../services/CCSReportService';
import { map } from 'rxjs/operators';
import { EBA_BANK } from 'src/models/EBA_BANK';
import { ACH_TRAN } from 'src/models/ACH_TRAN';
import { ACH_Outward } from 'src/models/ACH_Outward';
import { ACH_STATUS } from 'src/models/ACH_STATUS';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { ResponseEntity } from 'src/models/ResponseEntity';
import { DatePipe } from '@angular/common';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-achoutward',
  templateUrl: './achoutward.component.html',
  styleUrls: ['./achoutward.component.css'],
  providers: [DatePipe]
})
export class AchoutwardComponent implements OnInit {

  deviceSmall = 458;
  scrHeight: Number;
  scrWidth: Number;


  form = null;
  error = '';
  loading = false;
  count: number = 1;
  bankList: EBA_BANK[] = [];
  achTranList: ACH_TRAN[] = [];
  achStatusList: ACH_STATUS[] = [];
  achOutwardList: ACH_Outward[] = [];

  public startCount: number = 0;

  searchData: CCS_REPORT = null

  constructor(private service: CCSReportService, private router: Router, private dateAdapter: DateAdapter<Date>) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    //prepare combo
    this.achTranList = [
      { tran_code: "ALL", tran_name: "ALL" },
      // {tran_code:"CCT010",tran_name:"Customer Credit Transfer(Priority)"},
      // {tran_code:"CCT011",tran_name:"Customer Credit Transfer(LSF)"},
      // {tran_code:"CCT012",tran_name:"Customer Credit Transfer(ACH Bulk Payment)"},
      // {tran_code:"CCT013",tran_name:"Customer Credit Transfer(ACH Fast Payment)"}
    ];

    //prepare combo
    this.achStatusList = [
      { status_id: "ALL", status_name: "ALL" },
      { status_id: "CBMRE", status_name: "Failed" },
      // {status_id:"N",status_name:"N - New"},
      // {status_id:"CBMRE",status_name:"CBM - Rejected Messages"},
      // {status_id:"F",status_name:"F - Transaction input fail"},
      // {status_id:"FRC",status_name:"Failed Reverse at CBS"},
      // {status_id:"REVERSAL",status_name:"Reversal sent to CBM"},
      // {status_id:"SCMBN",status_name:"SCMBN - Sent to CBMNet"},
      // {status_id:"SRC",status_name:"Reverse at CBS"}
    ];
  }

  ngOnInit() {
    debugger;
    //trigger screen width
    this.getScreenSize();
    let todaydateStr = `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`;

    //Create Form
    this.form = new FormGroup({
      fromdate: new FormControl(new Date(), Validators.required),
      todate: new FormControl(new Date(), Validators.required),
      statusCode: new FormControl('ALL', Validators.required),
      exportOption: new FormControl('excel', Validators.required),
      bankCode: new FormControl('ALL', Validators.required),
      ccsTranCode: new FormControl('ALL', Validators.required)
    });

    //fetch EBABankList
    this.service.getEBABankList().subscribe((res: EBA_BANK[]) => {
      let dump: EBA_BANK = {
        bank_id: 0,
        bank_name: "ALL",
        bank_code: "ALL",
        status: "-",
        regcbmcode: "-"
      };

      if (res.length == 0) {
        this.bankList.push(dump);
      } else {
        this.bankList.push(dump);
        res.forEach((item, index, res) => {
          this.bankList.push(item);
        });
      }

    }, (error) => {
      let dump: EBA_BANK = {
        bank_id: 0,
        bank_name: "ALL",
        bank_code: "ALL",
        status: "-",
        regcbmcode: "-"
      };
      this.bankList[0] = dump;
      console.log(error);
    });//end of ccs bank api fetching
  }

  submit(formdata: CCS_REPORT) {
    this.loading = true;
    this.startCount = 0;
    if (this.form.invalid) {
      this.error = "Please provide required fields";
      return;
    }

    var buttonName = document.activeElement.getAttribute("Name");
    if (buttonName === 'export') {
      console.log("-----Submit Export-----");

      if (formdata.exportOption == 'pdf') {
        this.service.exportACHOutwardPdf(formdata).pipe(
          map((data: any) => {
            let blob = new Blob([data], {
              type: 'application/pdf'
            });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'ACH_Outward.pdf';
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);
          })).subscribe(
            res => {
              this.loading = false;
            },
            error => {
              this.loading = false;
              this.error = "Cannot export excel (Internal Server Error)";
              console.log(error);
            });
      } else if (formdata.exportOption == 'excel') {
        console.log("excel")
        this.error = '';
        this.loading = true;
        this.service.exportACHOutwardExcel(formdata)
          .pipe(
            map((data: any) => {
              let blob = new Blob([data], {
                type: 'application/octet-stream'
              });
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = "ACH_Outward.xlsx";
              link.click();
              console.log("Finish >>>")
            }))
          .subscribe((res) => {
            this.loading = false;
          }, (error) => {
            this.loading = false;
            this.error = "Cannot export excel (Internal Server Error)";
            console.log(error);
          });
      }
    } else if (buttonName === 'search') {
      console.log("-----Submit Search-----");
      this.searchData = formdata;
      //call service
      this.service.getACHOutwardWeb(formdata).subscribe((res: ResponseEntity) => {
        this.loading = false;
        this.achOutwardList = res.achoutwards;
      }, (error) => {
        this.loading = false;
        this.error = "(Internal Server Error)";
        console.log(error);
      });
    }

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  searchBtnOnClick(formdata: CCS_REPORT) {
    this.searchData = formdata;
    //call service
    this.service.getACHOutwardWeb(formdata).subscribe((res: ResponseEntity) => {
      this.achOutwardList = res.achoutwards;
    }, (error) => {
      this.loading = false;
      this.error = "(Internal Server Error)";
      console.log(error);
    });

  }


}
