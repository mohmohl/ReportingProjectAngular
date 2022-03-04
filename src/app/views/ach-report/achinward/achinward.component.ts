import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter} from '@angular/material/core';

import { map } from 'rxjs/operators';

import { CCS_REPORT } from 'src/models/CCS_REPORT';
import { EBA_BANK } from 'src/models/EBA_BANK';
import { ACH_TRAN } from 'src/models/ACH_TRAN';
import { ACH_STATUS } from 'src/models/ACH_STATUS';
import { HostListener } from "@angular/core";
import { ACH_Inward } from 'src/models/ACH_Inward';
import { ResponseEntity } from 'src/models/ResponseEntity';

import { CCSReportService } from '../../../../services/CCSReportService';

@Component({
  selector: 'app-achinward',
  templateUrl: './achinward.component.html',
  styleUrls: ['./achinward.component.css'],
})
export class AchinwardComponent implements OnInit {

  //deviceSmall = 458;
  deviceSmall=1261;
  scrHeight: Number;
  scrWidth: Number;

  form = null;
  error = '';
  loading = false;
  bankList: EBA_BANK[] = [];
  achTranList: ACH_TRAN[] = [];
  achStatusList: ACH_STATUS[] = [];
  achInwardList: ACH_Inward[] = [];

  public startCount: number = 0;

  searchData: CCS_REPORT = null;

  constructor(private service: CCSReportService, private dateAdapter: DateAdapter<Date>) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    //trigger screen width
    this.getScreenSize();

    //prepare combo
    this.achTranList = [
      { tran_code: "ALL", tran_name: "ALL" },
      //{tran_code:"CCT010",tran_name:"Customer Credit Transfer(Priority)"},
      //{tran_code:"CCT011",tran_name:"Customer Credit Transfer(LSF)"},
      //{tran_code:"CCT012",tran_name:"Customer Credit Transfer(ACH Bulk Payment)"},
      //{tran_code:"CCT013",tran_name:"Customer Credit Transfer(ACH Fast Payment)"}
    ];

    //prepare combo
    this.achStatusList = [
      { status_id: "ALL", status_name: "ALL" },
      //{status_id:"A",status_name:"A - Approved"},
      { status_id: "SC", status_name: "Core Banking Success" },
      //{status_id:"CBMRE",status_name:"CBM - Rejected Messages"},
      { status_id: "F", status_name: "Inward Failed" },
      { status_id: "FRC", status_name: "Outward Reversal Failed" },
      //{status_id:"REVERSAL",status_name:"Reversal sent to CBM"},
      //{status_id:"SCMBN",status_name:"SCMBN - Sent to CBMNet"},
      { status_id: "SRC", status_name: "Outward Reversal Success" },
      { status_id: "FCBS", status_name: "Inward Failed & Reversal" }

    ];
  }

  ngOnInit() {

    //Create Form
    this.form = new FormGroup({
      fromdatesss: new FormControl(new Date(), Validators.required),
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
      debugger;
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
    });//end of ach bank api fetching
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
      this.loading = true;
      if (formdata.exportOption == 'pdf') {
        this.service.exportACHInwardPdf(formdata).pipe(
          map((data: any) => {
            let blob = new Blob([data], {
              type: 'application/pdf'
            });
            var link = document.createElement('a');
            debugger;
            link.href = window.URL.createObjectURL(blob);
            link.download = 'ACH_Inward.pdf';
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
        this.service.exportACHInwardExcel(formdata)
          .pipe(
            map((data: any) => {
              let blob = new Blob([data], {
                type: 'application/octet-stream'
              });
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = "ACH_Inward.xlsx";
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
      console.log ("this.searchData" +JSON.stringify(this.searchData));
      //call service
      this.service.getACHInwardWeb(formdata).subscribe((res: ResponseEntity) => {
        this.loading = false;
        this.achInwardList = res.achinwards;
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
}
