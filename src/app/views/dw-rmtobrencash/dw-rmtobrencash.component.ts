import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-rmtobrencash',
  templateUrl: './dw-rmtobrencash.component.html',
  styleUrls: ['./dw-rmtobrencash.component.css']
})
export class DwRmtobrencashComponent implements OnInit {
  loading;
  error;
  _showData;
  _noData;
  l_branch;
  monthList;
  month;
  month_desc;
  cusID = 'ALL';
  g_rmtobrencashdatalist;
  tr_date;
  index : number = 0;
  subChAmt : number = 0;
  subTrAmt : number = 0;
  
  grandChAmt : number = 0;
  grandTrAmt : number = 0;

  count_cash : number = 0 ;
  count_transfer : number = 0;

  brCode = "";
  branchSetupData= {"bank_name" : "", "branch_name" : "" , "branch_code" : ""};

  constructor(private http: HttpService, private cdf : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.readReferenceData();
  }

  readReferenceData(){
    this.loading = true;
    this.http.doGet("/fttransaction/getAllBranchList").subscribe(
      data => {
        if(data != null && data.length > 0){
          this.l_branch = data;
          this.brCode = this.l_branch[0].branch_code;
          this.branchSetupData = this.l_branch[0];
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );

    
    this.http.doGet("/fttransaction/getRMTOBREncashMonth").subscribe(
      data => {
        if(data != null){
          this.monthList = data;
          this.month = this.monthList[0];
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );
  }

  changeBranchCombo(index) 
  {    
    this.cdf.detach();
    this.brCode = this.l_branch[index].branch_code;
    this.branchSetupData = this.l_branch[index];
  }

  changeDateCombo(index){
    this.cdf.detach();
    this.month = this.monthList[index];
  }

  
  groupBy(list, keyGetter) {
    this.grandTrAmt = 0;
    this.grandChAmt = 0;

    this.count_cash = 0;
    this.count_transfer = 0;

    const map = new Map();
    list.forEach((item) => {
        
          if(item.ch_amount != null && item.ch_amount != 0){
            this.grandChAmt += item.ch_amount;
            this.count_cash++;
          }

          if(item.tr_amount != null && item.tr_amount != 0){
            this.grandTrAmt += item.tr_amount;
            this.count_transfer++;
          }
          
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

showDatas(){
  this.loading = true;
  this.clearProperties();
  this.cdf.reattach();
  this.http.doPost("/fttransaction/getRMTOBREncashDatalist?date="+this.month+"&cusid="+this.cusID+"&branch="+ this.branchSetupData.branch_code,"RMT OBR Encash").subscribe(
    data => {
      this.loading = false;
      if(data != null){
        this.month_desc = this.month;
        if(data.length > 0){
          this.tr_date = data[0].trn_dt;
        }
        
        this.g_rmtobrencashdatalist  = this.groupBy(data, otherbranchdata => (otherbranchdata.trn_dt +"|"+ otherbranchdata.other_branch));
     
        this._showData = true;
        this._noData = false;
      }else{
        this._showData = false;
        this._noData = true;
      }
      
    },
    error => {
      this.loading = false;
    }
  );
}

clearSubTotal(){
  
  this.subChAmt = 0;
  this.subTrAmt = 0;
}

getIndex(){
  this.cdf.detach();
  this.index = this.index + 1;
  return this.index;
}

calculateSubTotal(data){
  this.subTrAmt += data.tr_amount;
  this.subChAmt += data.ch_amount;
}

clearProperties(){
  this.clearSubTotal();

  this.grandTrAmt = 0;
  this.grandChAmt = 0;

  this.count_cash = 0;
  this.count_transfer = 0;

  this.index = 0;

  this.g_rmtobrencashdatalist = [];
}

  exportPDF(){
    this.error="";
    this.loading = true;
  
    let fileName = "RMTOBREncash_" + this.branchSetupData.branch_code+"_"+this.month + ".pdf";
    this.http.generatePost_PDF("/fttransaction/exportRMTOBREncashPDF?date="+this.month+"&cusid="+this.cusID,this.branchSetupData,
    fileName).subscribe(
        res => {this.loading = false; },
        error => {
          console.log("Remittance Encash Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate Remittance Encash!.. Have the error)";
            }
          this.loading = false;
        });
        

  }
}
