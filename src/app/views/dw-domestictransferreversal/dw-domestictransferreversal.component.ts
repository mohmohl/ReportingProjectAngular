import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-domestictransferreversal',
  templateUrl: './dw-domestictransferreversal.component.html',
  styleUrls: ['./dw-domestictransferreversal.component.css']
})
export class DwDomestictransferreversalComponent implements OnInit {

  loading;
  error;
  monthList = [];
  month : string;
  branch : string = "ALL";
  domesticftdatalist : any;
  g_domesticftdatalist : any;
  domesticftdataset : Array<any> =[];
  totNoOfTrans = 0;
  _showData =false;
  _NoData = false;
  subDrAmt = 0;
  subCharge1 = 0;
  subCharge2 = 0;
  subCharge3 = 0;
  subTotal = 0;

  grandDrAmt = 0;
  grandCharge1 = 0;
  grandCharge2 = 0;
  grandCharge3 = 0;
  grandTotal = 0;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.readReferenceData();
  }

  
  readReferenceData(){
    //read months
    this.http.doGet('/fttransaction/getDomesticFTMonth').subscribe(res=>{
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

  clearProperties(){
    this._showData =false;
    this._NoData = false;
    this.domesticftdatalist = [];
    this.g_domesticftdatalist = [];
    this.domesticftdataset = [];
    this.loading = true;

    this.grandDrAmt   = 0;
    this.grandCharge1 = 0;
    this.grandCharge2 = 0;
    this.grandCharge3 = 0;
    this.grandTotal = 0;

    this.clearSubTotal();
  }

  showDatas(){
    this.clearProperties();
    this.http.doPost("/fttransaction/getDomesticTransferRevsList?date="+this.month+"&branch="+this.branch, "Domestic Fund Transfer Reversal").subscribe(
      res => {
        this.loading = false;
        if(res != null){
          this.domesticftdatalist = res;
          this.totNoOfTrans = this.domesticftdatalist.length;
          let result = Array.from(new Set(this.domesticftdatalist.map(x => x.other_bank_name)));
          
          this.g_domesticftdatalist  = this.groupBy(this.domesticftdatalist, otherbank => otherbank.other_bank_name);
          for(let i=0; i<result.length;i++){
            let mdata = {"otherbankname" : result[i]+"", "datalist" : this.g_domesticftdatalist.get(result[i])};
            this.domesticftdataset.push(mdata);          
          }
          this.calculateGrandTotal();
          this. _showData = true;
        }else{
          this._NoData = true;
        }
        
      },
      error => {
        console.log("Read Domestic Fund Transfer Reversal Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );

  }

  exportPDF(){
    this.error="";
    this.loading = true;
 
    this.http.export_PDF("/fttransaction/exportDomesticTransferRevsPDF?date="+this.month+"&branch="+
    this.branch).pipe(
    map((data: any) => {
      
      let blob = new Blob([data], {
        type: "application/pdf"
      });
      var a = document.createElement("a");
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      a.href = fileURL;
      a.target     = '_blank'; 
      a.download = "Domestic Fund Transfer Reversal_" + this.month + ".pdf";
      document.body.appendChild(a);
      a.click();
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Domestic Fund Transfer Reversal Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate Domestic Fund Transfer Reversal!.. Have the error)";
          }
        this.loading = false;
      });
  }

  getTotals(data){
    this.subDrAmt += data.dr_amount;
    this.subCharge1 += data.comm1;
    this.subCharge2 += data.comm2;
    this.subCharge3 += data.comm3;

    let total = data.dr_amount + data.comm1 + data.comm3 + data.comm2;
    this.subTotal += total;
    return total;
  }

  clearSubTotal(){
   
    this.subDrAmt = 0;
    this.subCharge1 = 0;
    this.subCharge2 = 0;
    this.subCharge3 = 0;
    this.subTotal = 0;
  }

  calculateGrandTotal(){
    this.domesticftdatalist.forEach((item) => {
      this.grandDrAmt += item.dr_amount;
      this.grandCharge1 += item.comm1;
      this.grandCharge2 += item.comm2;
      this.grandCharge3 += item.comm3;

    });
    this.grandTotal =  this.grandDrAmt +  this.grandCharge1 + this.grandCharge2  + this.grandCharge3 ;
  }
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
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


}
