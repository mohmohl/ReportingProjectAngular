import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
//import { jsPDF } from "jspdf";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dw-incomingmt103',
  templateUrl: './dw-incomingmt103.component.html',
  styleUrls: ['./dw-incomingmt103.component.css']
})


 
export class DwIncomingmt103Component implements OnInit  {

  branch : string;
  currency : string;
  month : string;
  month_desc : string;
  rmtbank : string = "ALL";
  authStatus : string = 'A';
  ccyList = [];
  monthList = [];
  incomingmt103list = [];
  g_incomingmt103list : any;
  totalAmount=0;
  totalCommission=0;

  subTotalAmount=0;
  subTotalCommission=0;

  loading;
  error;
  titleCCy : string;

  _showFCY = false;
  _noData = false;

  _showMMK = false;

  branchData = {"bank_name" : "", "branch_name":"" , "branch_code":""};
  branchData_all = {"bank_name" : "", "branch_name":"", "branch_code":""};
  branchData_996 = {"bank_name" : "", "branch_name":"", "branch_code":""};


  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.readReferenceData();
    this.readBranchData();
  }

  readReferenceData(){
    this.loading = true;
    //read months
    this.http.doGet('/fttransaction/getIncomingMT103Months').subscribe(res=>{
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
          

          if(this.ccyList[0].code == "MMK"){
            this.branch = "ALL";
            this.branchData = this.branchData_all;
          }else{
            this.branch = "996";
            this.branchData = this.branchData_996;
          }
        }
    },
    error => {
      
      console.log("Read Currency List Error >>> "+error)
      debugger;
      this.loading = false;
    });
  }

  changeCurrencyCode(index) 
  {
    if(this.ccyList[index].code == "MMK"){
      this.branch = "ALL";
    }else{
      this.branch = "996";
    }

  }

  readBranchData(){
    
    this.http.doGet("/fttransaction/getBranchSetup?branch=ALL").subscribe(
      res => {
        this.loading = false;
        this.branchData_all = res;        
      },
      error => {
        console.log("Read Incoming MT 103 Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );


    this.http.doGet("/fttransaction/getBranchSetup?branch=996").subscribe(
      res => {
        this.loading = false;
        this.branchData_996 = res;        
      },
      error => {
        console.log("Read Incoming MT 103 Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );
      
  }

  clearProperties(){
    this.totalAmount = 0;
    this.totalCommission = 0;

    this.subTotalAmount = 0;
    this.subTotalCommission = 0;

    this.g_incomingmt103list = [];
  }

  showDatas(){
    this.clearProperties();
    this.loading = true;
    this.http.doPost("/fttransaction/getIncomingMT103DataList?date="+this.month+"&ccy="+this.currency+"&branch="+
    this.branch+"&rmtBank="+this.rmtbank+"&status="+this.authStatus, "Incoming MT 103 Message").subscribe(
      res => {
        this.loading = false;
        
        if(res != null){
          this.month_desc = this.month;
          this._noData = false;
          this.titleCCy = this.currency;

          if(this.currency == 'MMK'){
            this._showMMK = true;
            this._showFCY = false;
            this.branchData = this.branchData_all;
            this.g_incomingmt103list = this.groupBy(res, data => data.branch_name);
          }
          else{
            this._showMMK = false;
            this._showFCY = true;
            this.branchData = this.branchData_996;
            this.incomingmt103list = res;
            this.getTotals();
          }
        }
        else{
          this._showMMK = false;
          this._showFCY = false;
          this._noData = true;
        }
        
        
      },
      error => {
        console.log("Read Incoming MT 103 Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );
  }

  
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        
          this.totalAmount += item.cr_amount;
          this.totalCommission += item.comission;
          
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
   
    return (map);
}

  getTotals(){
    for(let i=0; i<this.incomingmt103list.length;i++){
      this.totalAmount += this.incomingmt103list[i].cr_amount;
      this.totalCommission += this.incomingmt103list[i].comission;
    }
  }

  calculateSubTotals(data){
      this.subTotalAmount += data.cr_amount;
      this.subTotalCommission += data.comission;
  }

  clearSubTotal(){
    this.subTotalAmount = 0;
    this.subTotalCommission = 0;
  }

exportPDF(){
  this.error="";
    this.loading = true;
    //exportIncomingMT103PDF
    let fileName = "IncomingMT103_"+this.currency+"_" + this.branch+"_"+this.month + ".pdf";
    this.http.generatePost_PDF("/fttransaction/exportIncomingMT103PDF?date="+this.month+"&ccy="+this.currency+"&rmtBank="+this.rmtbank+"&status="+this.authStatus,this.branchData,
    fileName).subscribe(
        res => {this.loading = false; },
        error => {
          console.log("Incoming MT 103 Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate Incoming MT 103 !.. Have the error)";
            }
          this.loading = false;
        });
        
}
}
