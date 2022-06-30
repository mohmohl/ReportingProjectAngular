import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-obrencashccsi',
  templateUrl: './dw-obrencashccsi.component.html',
  styleUrls: ['./dw-obrencashccsi.component.css']
})
export class DwObrencashccsiComponent implements OnInit {

  loading;
  error;
  branchList = [];
  branch_code;
  branch_name;

  monthList = [];
  month;

  cusID = 'ALL';
  _showData;
  _noData;

  obrencashccsidatalist = [];
  g_obrencashccsidatalist : any;

  grandEncashAmt : number = 0;
  grandCommMAB : number = 0; 
  grandCommOB : number = 0;
  grandTotal : number = 0;

  subEncashAmt : number = 0;
  subCommMAB : number = 0; 
  subCommOB : number = 0;
  subTotal : number = 0;

  totNoOfTrans : number = 0;

  constructor(private http: HttpService) { }

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
    this.http.doGet("/fttransaction/getOBREncashCCSIMonth").subscribe(
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

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        //calculate total
        this.grandEncashAmt += item.encashamount;
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

  showDatas(){

    this.loading = true;
    this._showData = false;
    this._noData = false;
    this.obrencashccsidatalist = [];
    this.http.doPost("/fttransaction/getOBREncashCCSIDatalist?branch="+this.branch_code
    +"&date="+this.month+"&cusid="+this.cusID,"OBR Encash CCSI").subscribe(
      data => {
        if(data != null){

          this.totNoOfTrans = data.length;
          this._showData = true;
          
          let result = Array.from(new Set(data.map(x => x.other_bank)));
          
          this.g_obrencashccsidatalist  = this.groupBy(data, otherbank => otherbank.other_bank);
          for(let i=0; i<result.length;i++){
            let mdata = {"otherbank" : result[i]+"", "datalist" : this.g_obrencashccsidatalist.get(result[i])};
            this.obrencashccsidatalist.push(mdata);          
          }
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
    this.subEncashAmt += data.encashamount;
    this.subCommMAB += data.comm1;
    this.subCommOB += data.comm2;

    let total = data.encashamount + data.comm1 + data.comm2;
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
  
    this.http.export_PDF("/fttransaction/exportOBREncashCCSIPDF?date="+this.month+"&cusid="+this.cusID+"&branch="+
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
        a.download="OBREncashCCSI_" + this.branch_code+"_"+this.month + ".pdf";
        document.body.appendChild(a);
        a.click();
      })).subscribe(
        res => {this.loading = false; },
        error => {
          console.log(" OBR Encash CCSIError >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate OBR Encash CCSI!.. Have the error)";
            }
          this.loading = false;
        });
        
  }

}
