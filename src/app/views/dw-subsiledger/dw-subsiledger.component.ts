import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dw-subsiledger',
  templateUrl: './dw-subsiledger.component.html',
  styleUrls: ['./dw-subsiledger.component.css']
})
export class DwSubsiledgerComponent implements OnInit {

  accno : string;
  branch : string;
  currency : string;
  month : string;
  l_SubsiAccs = [];
  m_SubsiAccs = [];
  l_branch = [];
  monthList = [];
  subsidarydatalist = [{"trn_dt":"","trn_desc":"","d_lcy_amt":0.00,"c_lcy_amt":0.00,"d_fcy_amt":0.00,"c_fcy_amt":0.00,"status":"", "fcybalance":0.00, "lcybalance":0.00}];
  subsidarydataset : any;
  openingData : any;
  glData : any;
  totalFCYDr=0;
  totalLCYDr=0;
  totalFCYCr=0;
  totalLCYCr=0;
  value = 0;
  value1 = 0;
  value2 = 0;
  value3 = 0;
  loading;
  error;
  titleCCy : string;
  _isLCY = false;
  _isFCY = false;

  _showData = false;

  branchData : any;


  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.readReferenceData();
  }

  readReferenceData(){
    this.loading = true;
    //read subsi accounts
    this.http.doGet('/fttransaction/getAllSubsiAccs').subscribe(res=>{
      this.loading = false;
      this.l_SubsiAccs = res;
      if(this.l_SubsiAccs.length>0){
        this.accno = this.l_SubsiAccs[0].old_gl;
        this.changeAccCombo(0);
      }
  },
  error => {
    console.log("Read Subsi Accounts Error >>> "+error)
    debugger;     
    this.loading = false;
  });

    //read months
    this.http.doGet('/fttransaction/getSubsiMonthNameList').subscribe(res=>{
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
   

  }

  readAllBranch(){
    this.http.doGet('/fttransaction/getAllBranchList').subscribe(res=>{
      this.loading = false;
      this.l_branch = res;
      if(this.l_branch.length>0){
        this.branch = this.l_branch[0].branch_code;
      }
  },
  error => {
    
    console.log("Read Currency List Error >>> "+error)
    debugger;
    this.loading = false;
  });
  }

  changeAccCombo(index) 
  {
    if(this.l_SubsiAccs[index].branch == "ALL"){
      this.readAllBranch();
    }else{
      this.l_branch = [{"branch_code": this.l_SubsiAccs[index].branch}];
      this.branch = this.l_SubsiAccs[index].branch;
    }

    this.http.doGet("/fttransaction/getSubsiAccData?acno="+ this.l_SubsiAccs[index].old_gl).subscribe(
      res => {
        this.loading = false;
        this.m_SubsiAccs = res;     
        if(this.m_SubsiAccs.length>0){
          this.currency = this.m_SubsiAccs[0].currency;
        }   
      },
      error => {
        console.log("Read subsi account data Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );
      
  }

  clearProperties(){
    this._showData = false;
    this._isFCY = false;
    this._isLCY = false;
    this.totalFCYDr=0;
    this.totalLCYDr=0;
    this.totalFCYCr=0;
    this.totalLCYCr=0;
    this.value = 0;
    this.value1 = 0;
    this.value2 = 0;
    this.value3 = 0;
  }

  showDatas(){
    this.loading = true;
    this.clearProperties();
    this.http.doGet("/fttransaction/getBranchSetup?branch="+ this.branch).subscribe(
      res => {
        this.loading = false;
        this.branchData = res;        
      },
      error => {
        console.log("Read Subsidary Ledger Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );

    this.http.doPost("/fttransaction/getSubsiLedgerDataList?date="+this.month+"&ccy="+this.currency+"&branch="+
    this.branch+"&acno="+this.accno, "Subsidary Ledger").subscribe(
      res => {
        this.loading = false;
        this.subsidarydataset = res;
        if(this.subsidarydataset != null){
          this.openingData = this.subsidarydataset.subsiOpening;
          this.subsidarydatalist = this.subsidarydataset.subsiData;
          this.glData = this.subsidarydataset.gldata;

          this._showData = true;
          if(this.currency == "MMK"){
            this.value = this.value + this.openingData.lcy_opening_bal;    
            this._isLCY = true;
          }
          else{
            this.value = this.value + this.openingData.acy_opening_bal;  
            this.value2 = this.value2 + this.openingData.lcy_opening_bal;
            this._isFCY = true;
          }
          this.titleCCy = this.currency;
          this.getTotals();
        }
        
      },
      error => {
        console.log("Read Subsidary Ledger Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );
  }

  getTotals(){

    for(let i=0; i<this.subsidarydatalist.length;i++){
      if(this._isFCY){
        this.subsidarydatalist[i].status = this.getFCYStatus(this.subsidarydatalist[i]);
        this.subsidarydatalist[i].fcybalance = this.getFCY_FCYBalance();
        this.subsidarydatalist[i].lcybalance = this.getFCY_LCYBalance();
        this.totalFCYDr += this.subsidarydatalist[i].d_fcy_amt;
        this.totalLCYDr += this.subsidarydatalist[i].d_lcy_amt;
        this.totalFCYCr += this.subsidarydatalist[i].c_fcy_amt;
        this.totalLCYCr += this.subsidarydatalist[i].c_lcy_amt;
      }
      else if(this._isLCY){
        this.subsidarydatalist[i].status = this.getLCYStatus(this.subsidarydatalist[i]);
        this.subsidarydatalist[i].lcybalance = this.getLCYBalance();
        this.totalLCYDr += this.subsidarydatalist[i].d_lcy_amt;
        this.totalLCYCr += this.subsidarydatalist[i].c_lcy_amt;
      }
     
    }
  }

  exportPDF(){
   
  this.error="";
  this.loading = true;
 
  this.http.export_PDF("/fttransaction/exportSubsiLedgerPDF?date="+this.month+"&ccy="+this.currency+"&branch="+
    this.branch+"&acno="+this.accno).pipe(
    map((data: any) => {
      
      let blob = new Blob([data], {
        type: "application/pdf"
      });
      var a = document.createElement("a");
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      a.href = fileURL;
      a.target     = '_blank'; 
      a.download = "Subsidiary Ledger_" + this.branch + "_" + this.accno + "_" + this.currency + "_" + this.month + ".pdf";
      document.body.appendChild(a);
      a.click();
    })).subscribe(
      res => {this.loading = false; },
      error => {
        console.log("Subsidary Ledger Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate Subsidary Ledger!.. Have the error)";
          }
        this.loading = false;
      });
  }

  getLCYOpening(lcy_opening){
    
    return Math.abs(lcy_opening);
  }

  getLCYBalance(){
    return Math.abs(this.value1);
  }

  getLCYStatus(data){
    var status;
   
    this.value = (this.value + data.c_lcy_amt) - data.d_lcy_amt;
    this.value1 = this.value;

    if(this.value1 < 0) 
      status = 'Dr.';
    else 		
      status = 'Cr.';
      return status;
  }


  getFCY_FCYOpening(acy_opening){
   
    return Math.abs(acy_opening);

  }

  getFCY_LCYOpening(lcy_opening_bal){
   
    return Math.abs(lcy_opening_bal);

  }

  getFCY_FCYBalance(){
    return Math.abs(this.value1);
  }

  getFCY_LCYBalance(){
    return Math.abs(this.value3);
  }

  getFCYStatus(data){
    var status;
    
    this.value = this.value + data.c_fcy_amt - data.d_fcy_amt;
    this.value1 = this.value;

    this.value2 = this.value2 + data.c_lcy_amt - data.d_lcy_amt;
    this.value3 = this.value2;

    if(this.value < 0) 
      status = 'Dr.';
    else 		
      status = 'Cr.';
      return status;
  }
}
