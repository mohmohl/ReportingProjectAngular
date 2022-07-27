import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-obrencashment',
  templateUrl: './dw-obrencashment.component.html',
  styleUrls: ['./dw-obrencashment.component.css']
})
export class DwObrencashmentComponent implements OnInit {

  loading;
  error;
  branchList = [];
  branch_code;
  branch_name;

  monthList = [];
  month;
  month_desc;

  cusID = 'ALL';
  _showData;
  _noData;

  g_obrencashdatalist : any;

  grandEncashAmt : number = 0;
  grandCommMAB : number = 0; 
  grandCommOB : number = 0;
  grandTotal : number = 0;

  subEncashAmt : number = 0;
  subCommMAB : number = 0; 
  subCommOB : number = 0;
  subTotal : number = 0;

  totNoOfTrans : number = 0;

  constructor(private http: HttpService, private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.readReference();
  }

  readReference(){
    this.loading = true;
    this.http.doGet("/fttransaction/getAllBranchList").subscribe(
      data => {
        if(data != null){
          this.branchList = data;
          this.branch_code = this.branchList[0].branch_code;
          this.branch_name = this.branchList[0].branch_name;
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );

    //
    this.http.doGet("/fttransaction/getOBREncashmentMonth").subscribe(
      data => {
        if(data != null){
          this.monthList = data;
          this.month = this.monthList[0];
          this.month_desc = this.monthList[0];
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        //calculate total
        this.grandEncashAmt += item.encashAmount;
        this.grandCommMAB += item.comm1;
        this.grandCommOB += item.comm2;

         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    this.grandTotal =  this.grandEncashAmt +  this.grandCommMAB + this.grandCommOB;
    return (map);
}

changeBranchCombo(index){
  this.cdf.detach();
  this.branch_code = this.branchList[index].branch_code;
  this.branch_name = this.branchList[index].branch_name;
}

changeDateCombo(index){
  this.cdf.detach();
}

  showDatas(){

    this.cdf.reattach();
    this.loading = true;
    this._showData = false;
    this._noData = false;
    this.grandEncashAmt = 0;
    this.grandCommMAB  = 0; 
    this.grandCommOB = 0;
    this.grandTotal = 0;
    this.month = this.month_desc;

    this.http.doPost("/fttransaction/getOBREncashmentDatalist?branch="+this.branch_code
    +"&date="+this.month+"&cusid="+this.cusID,"OBR Encashment Schdule").subscribe(
      data => {
        if(data != null){
          this.month_desc = this.month;

          this.totNoOfTrans = data.length;
          this._showData = true;          
          this.g_obrencashdatalist  = this.groupBy(data, otherbank => (otherbank.trn_dt + '|' + otherbank.other_bank) );
          
        }else{
          this._noData = true;
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );

  }

  getTotals(data){
    this.subEncashAmt += data.encashAmount;
    this.subCommMAB += data.comm1;
    this.subCommOB += data.comm2;

    let total = data.encashAmount + data.comm1 + data.comm2;
    this.subTotal += total;
    return total;
  }

  clearSubTotal(){
   
    this.subEncashAmt = 0;
    this.subCommMAB  = 0;
    this.subCommOB  = 0;
    this.subTotal = 0;
  }

  exportPDF(){
    this.error="";
    this.loading = true;
  
    this.http.export_PDF("/fttransaction/exportOBREncashmentPDF?date="+this.month+"&cusid="+this.cusID+"&branch="+
      this.branch_code+"&branchname="+this.branch_name).pipe(
      map((data: any) => {
        
        let blob = new Blob([data], {
          type: "application/pdf"
        });
        var a = document.createElement("a");
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL;
        a.target     = '_blank'; 
        a.download="OBREncashment_" + this.branch_code+"_"+this.month + ".pdf";
        document.body.appendChild(a);
        a.click();
      })).subscribe(
        res => {this.loading = false; },
        error => {
          console.log(" OBR Encashment Schedule Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate OBR Encashment Schedule!.. Have the error)";
            }
          this.loading = false;
        });
        
  }

}
