import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter} from '@angular/material/core';

import { map } from 'rxjs/operators';

import { CCS_REPORT } from 'src/models/CCS_REPORT';
import { EBA_BANK } from 'src/models/EBA_BANK';
import { CCS_TRAN } from 'src/models/CCS_TRAN';
import { CCS_STATUS } from 'src/models/CCS_STATUS';
import { HostListener } from "@angular/core";
import { CCS_Inward } from 'src/models/CCS_Inward';
import { ResponseEntity } from 'src/models/ResponseEntity';

import { CCSReportService } from '../../../../services/CCSReportService';

@Component({
  selector: 'app-ccsinward',
  templateUrl: './ccsinward.component.html',
  styleUrls: ['./ccsinward.component.css']
})
export class CcsinwardComponent implements OnInit {

    //deviceSmall=768;//in pixel
  //refer: https://www.angularjswiki.com/angular/how-to-add-a-class-based-on-condition-in-angular/
  deviceSmall=458;
  scrHeight:Number;
  scrWidth:Number;

  form = null;
  error = '';
  loading = false;
  bankList:EBA_BANK[]=[];
  ccsTranList:CCS_TRAN[]=[];
  ccsStatusList:CCS_STATUS[]=[];
  ccsInwardList: CCS_Inward[]=[];

  public startCount:number=0;

  searchData: CCS_REPORT=null;

  constructor(private service: CCSReportService, private dateAdapter: DateAdapter<Date>) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    
    //trigger screen width
    this.getScreenSize();

    //prepare combo
    this.ccsTranList=[
      {tran_code:"ALL",tran_name:"ALL"},
      //{tran_code:"CCT010",tran_name:"Customer Credit Transfer(Priority)"},
      //{tran_code:"CCT011",tran_name:"Customer Credit Transfer(LSF)"},
      //{tran_code:"CCT012",tran_name:"Customer Credit Transfer(ACH Bulk Payment)"},
      //{tran_code:"CCT013",tran_name:"Customer Credit Transfer(ACH Fast Payment)"}
    ];

    //prepare combo
    this.ccsStatusList=[
      {status_id:"ALL",status_name:"ALL"},
      //{status_id:"A",status_name:"A - Approved"},
      {status_id:"SC",status_name:"Core Banking Success"},
      //{status_id:"CBMRE",status_name:"CBM - Rejected Messages"},
      {status_id:"F",status_name:"Inward Failed"},
      {status_id:"FRC",status_name:"Outward Reversal Failed"},
      //{status_id:"REVERSAL",status_name:"Reversal sent to CBM"},
      //{status_id:"SCMBN",status_name:"SCMBN - Sent to CBMNet"},
      {status_id:"SRC",status_name:"Outward Reversal Success"},
      {status_id:"FCBS",status_name:"Inward Failed & Reversal"}
      
    ];
  }

  ngOnInit() {

    //Create Form
    this.form = new FormGroup({
      fromdate: new FormControl(new Date(), Validators.required),
      todate: new FormControl(new Date(), Validators.required),
      statusCode: new FormControl('ALL', Validators.required),
      exportOption: new FormControl('excel', Validators.required),
      bankCode:new FormControl('ALL',Validators.required), 
      ccsTranCode:new FormControl('ALL',Validators.required)
    });
    
    //fetch EBABankList
    this.service.getEBABankList().subscribe((res:EBA_BANK[])=>{
      let dump:EBA_BANK={
        bank_id: 0,
        bank_name: "ALL",
        bank_code: "ALL",
        status: "-",
        regcbmcode: "-" 
      };
    debugger;
      if(res.length==0){
        this.bankList.push(dump);
      }else{
        this.bankList.push(dump);
        res.forEach((item,index,res) => {
          this.bankList.push(item);
        });
      }

    },(error) => {
      let dump:EBA_BANK={
        bank_id: 0,
        bank_name: "ALL",
        bank_code: "ALL",
        status: "-",
        regcbmcode: "-" 
      };
      this.bankList[0]=dump;
      console.log(error);
    });//end of ccs bank api fetching
  }

  submit(formdata: CCS_REPORT) { 
    this.loading = true;
    this.startCount=0;
    if (this.form.invalid) {
      this.error = "Please provide required fields";
      return;
    }
     
    var buttonName = document.activeElement.getAttribute("Name");
     
    if(buttonName==='export'){
      this.loading = true;
            if(formdata.exportOption=='pdf'){
              this.service.exportCCSInwardPdf(formdata).pipe(
                map((data: any) => {
                  let blob = new Blob([data], {
                    type: 'application/pdf'
                  });
                  var link = document.createElement('a');
                  debugger;
                  link.href = window.URL.createObjectURL(blob);
                  link.download = 'RTGS_Inward.pdf';
                  link.target = '_blank';
                  link.click();
                  window.URL.revokeObjectURL(link.href);
                })).subscribe(
                  res => {
                    this.loading = false;
                  },
                  error => {
                    this.loading = false;
                    this.error="Cannot export excel (Internal Server Error)";
                    console.log(error);
                  });
          }else if(formdata.exportOption=='excel'){
              console.log("excel")
              this.error='';
              this.loading = true;
              this.service.exportCCSInwardExcel(formdata)
                .pipe(
                  map((data: any) => {
                  let blob = new Blob([data], {
                      type: 'application/octet-stream' 
                  });
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = "RTGS_Inward.xlsx";
                  link.click();
                  console.log("Finish >>>")
                }))
                .subscribe((res)=>{
                  this.loading = false;
                },(error) => {
                  this.loading = false;
                  this.error="Cannot export excel (Internal Server Error)";
                  console.log(error);
                });
          }
    }else if(buttonName==='search'){
        console.log("-----Submit Search-----");
        this.searchData=formdata;
        //call service
        this.service.getCCSInwardWeb(formdata).subscribe((res:ResponseEntity)=>{
          this.loading = false;
          this.ccsInwardList=res.ccsinwards;
        },(error)=>{
          this.loading = false;
          this.error="(Internal Server Error)";
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
