import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dw-domesticsfundtransfer',
  templateUrl: './dw-domesticsfundtransfer.component.html',
  styleUrls: ['./dw-domesticsfundtransfer.component.css']
})
export class DwDomesticsfundtransferComponent implements OnInit {

  loading;
  error;
  monthList = [];
  month : string;
  auth : string = 'A';
  branch : string = "ALL";
  domesticftdatalist : any;
  g_domesticftdatalist : any;
  domesticftdataset : Array<any> =[];
  totNoOfTrans = 0;
  _showData =false;
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

  showDatas(){
    this._showData =false;
    this.http.doPost("/fttransaction/getDomesticFTDataList?date="+this.month+"&branch="+this.branch+"&status="+
    this.auth, "Domestic Fund Transfer").subscribe(
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
        }
        
      },
      error => {
        console.log("Read Domestic Fund Transfer Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );

  }

  exportPDF(){
    this.error="";
  this.loading = true;
 
  this.http.doGet("/fttransaction/exportDomesticFTransferPDF?date="+this.month+"&status="+this.auth+"&branch="+
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
      document.body.appendChild(a);
      a.click();
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Detail Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate detail trial!.. Have the error)";
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
