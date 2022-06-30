import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-dailyfundtransfer',
  templateUrl: './dw-dailyfundtransfer.component.html',
  styleUrls: ['./dw-dailyfundtransfer.component.css']
})
export class DwDailyfundtransferComponent implements OnInit {

  reportTypeList = [
    {"code":"IBOR", "description" : "Own Account Transfer"},
    {"code":"IBIR", "description" : "Internal and Multiple Account"},
    {"code":"IBBP", "description" : "Bulk Payment Transfer"},
    {"code":"ICO3", "description" : "International Transfer"},
  ];
  
  currencyList = [];
  monthList = [];

  dailytransferList : any;

  loading = false;
  error;

  rptType : string = "IBOR";
  month : string;
  branch : string = "ALL";
  currency : string;
  subDrAmt = 0;
  subCrAmt = 0;
  subCharge = 0;

  totDrAmt = 0;
  totCrAmt = 0;

  _showData = false;
  totNoOfTrans = 0;

  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.readReference();
  }

  readReference(){
    this.http.doGet('/fttransaction/getDailyTransferMonth').subscribe(res=>{
      this.loading = false;
      this.monthList = res;
      if(this.monthList.length>0){
        this.month = this.monthList[0];
      }
  },
  error => {
    
    console.log("Read Currency List Error >>> "+error)
    debugger;
    this.loading = false;
  });

    this.http.doGet('/fttransaction/getAllCurrency').subscribe(res=>{
      this.loading = false;
      this.currencyList = res;
      if(this.currencyList.length>0){
        this.currency = this.currencyList[0].code;
      }
  },
  error => {
    
    console.log("Read Currency List Error >>> "+error)
    debugger;
    this.loading = false;
  });
}
  
showDatas(){
  this.totNoOfTrans = 0;
  this.subDrAmt = 0;
  this.subCrAmt = 0;
  this.subCharge = 0;
  this.totDrAmt = 0;
  this.totCrAmt = 0;
  this.loading = true;
  
  this.http.doPost('/fttransaction/getDailyFundTransferDataList?date='+this.month+'&rptType='+this.rptType+'&branch='+this.branch+'&ccy='+this.currency,"Daily Fund Transfer").subscribe(res=>{
    this.loading = false;
    this._showData = true;
    this.dailytransferList = res;
    if(this.dailytransferList.length>0){
      this.totNoOfTrans = this.dailytransferList.length;
      this.subDrAmt = this.dailytransferList.reduce((sum, current) => sum + current.dr_amount, 0);
      this.subCrAmt = this.dailytransferList.reduce((sum, current) => sum + current.cr_amount, 0);
      this.subCharge = this.dailytransferList.reduce((sum, current) => sum + current.charge_amt, 0);
      this.totDrAmt = this.subDrAmt;
      this.totCrAmt = this.subCrAmt + this.subCharge;
    }
},
error => {
  
  console.log("Read Daily Fund Transfer Error >>> "+error)
  debugger;
  this.loading = false;
});
}

exportPDF(){
  this.error="";
  this.loading = true;
 
  this.http.export_PDF('/fttransaction/exportDailyFTransferPDF?date='+this.month+'&rptType='+this.rptType+'&branch='+this.branch+'&ccy='+this.currency).pipe(
    map((data: any) => {
      
      let blob = new Blob([data], {
        type: "application/pdf"
      });
      var a = document.createElement("a");
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      a.href = fileURL;
      a.target     = '_blank'; 
      a.download = "Daily Fund Transfer_" + this.rptType + "_" + this.currency + "_" + this.month + ".pdf";
      document.body.appendChild(a);
      a.click();
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Transfer Report Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate Transfer Report!.. Have the error)";
          }
        this.loading = false;
      });
}

}
