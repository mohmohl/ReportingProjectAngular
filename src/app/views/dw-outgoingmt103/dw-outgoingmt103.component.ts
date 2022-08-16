import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-outgoingmt103',
  templateUrl: './dw-outgoingmt103.component.html',
  styleUrls: ['./dw-outgoingmt103.component.css']
})
export class DwOutgoingmt103Component implements OnInit {

  branch : string = '996';
  currency : string;
  month : string;
  month_desc : string;
  rcvbank : string = "ALL";
  authStatus : string = 'A';
  ccyList = [];
  monthList = [];
  outgoingmt103list = [];

  totalAmount=0;
  totalCommission=0;
  totalSwift=0;

  loading;
  error;
  titleCCy : string;

  _showData = false;
  _noData = false;

  branchData = {"bank_name":"","branch_name":"","branch_code":""}

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.readReferenceData();
  }

  readReferenceData(){
    this.loading = true;
    // read branch 996
    this.http.doGet("/fttransaction/getBranchSetup?branch=996").subscribe(
      res => {
        this.loading = false;
        this.branchData = res;        
      },
      error => {
        console.log("Read Incoming MT 103 Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );

    //read months
    this.http.doGet('/fttransaction/getOutgoingMT103Months').subscribe(res=>{
        this.loading = false;
        this.monthList = res;
        if(this.monthList.length>0){
          this.month = this.monthList[0];
        }
    },
    error => {
      console.log("Read Months List Error >>> "+error)
      debugger;     
      this.loading = false;
    });

    //read currencyList
    this.http.doGet('/fttransaction/getAllCurrency').subscribe(res=>{
        this.loading = false;
        this.ccyList = res;
        if(this.ccyList.length>0){
          this.currency = this.ccyList[0].code;
        }
    },
    error => {
      console.log("Read Currency List Error >>> "+error)
      debugger;
      this.loading = false;
    });

    this.http.doGet('/fttransaction/getAllCurrency').subscribe(res=>{
        this.loading = false;
        this.ccyList = res;
        if(this.ccyList.length>0){
          this.currency = this.ccyList[0].code;
        }
    },
    error => {
      console.log("Read Currency List Error >>> "+error)
      debugger;
      this.loading = false;
    });

  }

  clearProperties(){
    this.outgoingmt103list = [];
    this.totalAmount = 0;
    this.totalCommission = 0;
    this.totalSwift = 0;
    this.error="";
  }

  showDatas(){
    this.clearProperties();
    this.loading = true;
    this.http.doPost("/fttransaction/getOutgoingMT103DataList?date="+this.month+"&ccy="+this.currency+"&branch="+
    this.branch+"&rcvBank="+this.rcvbank+"&status="+this.authStatus, "Outgoing MT 103 Message").subscribe(
      res => {
        this.loading = false;
        
        if(res != null){
          this.month_desc = this.month;
          this._showData = true;
          this._noData = false;
          this.titleCCy = this.currency;
          this.outgoingmt103list = res;
          this.getTotals();

        }
        else{
          this._showData = false;
          this._noData = true;
        }
        
        
      },
      error => {
        console.log("Read Outgoing MT 103 Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );
  }

  getTotals(){
    for(let i=0; i<this.outgoingmt103list.length;i++){
      this.totalAmount += this.outgoingmt103list[i].dr_amount;
      this.totalCommission += this.outgoingmt103list[i].comission;
      this.totalSwift += this.outgoingmt103list[i].swift;
    }
  }

  
exportPDF(){
  this.error="";
    this.loading = true;
    //exportOutgoingMT103PDF
    let fileName = "OutgoingMT103_"+this.currency+"_" + this.branch+"_"+this.month + ".pdf";
    this.http.generatePost_PDF("/fttransaction/exportOutgoingMT103PDF?date="+this.month+"&ccy="+this.currency+"&rcvBank="+this.rcvbank+"&status="+this.authStatus,this.branchData,
    fileName).subscribe(
        res => {this.loading = false; },
        error => {
          console.log("Outgoing MT 103 Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate Outgoing MT 103 !.. Have the error)";
            }
          this.loading = false;
        });
        
}

}
