import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-cctransfer',
  templateUrl: './dw-cctransfer.component.html',
  styleUrls: ['./dw-cctransfer.component.css']
})
export class DwCctransferComponent implements OnInit {

  @ViewChild('content', { static: false }) pdfcontent: ElementRef;

  loading;
  error;
  monthList = [];
  month : string ;
  branch = "ALL";
  _showData = false;
  _noData = false;

  cctransferdatalist = [];
  totalBuyLCY_Amt = 0;
  totalBuyFCY_Amt = 0;
  totalSellFCY_Amt = 0;
  totalSellLCY_Amt = 0;


  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.readReference();
  }

  readReference(){
    this.loading = true;
    this.http.doGet('/fttransaction/getCrossCcyTransferMonths').subscribe(res=>{
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
    this._noData = false;
    this._showData = false;
    this.loading = true;
    this.http.doPost('/fttransaction/getCrossCcyTransferDatas?date='+this.month+'&branch='+this.branch,"Cross Currency Fund Transfer").subscribe(res=>{
        this.loading = false;
        
        if(res != null && res.length > 0){
          this._showData = true;
          this.cctransferdatalist = res;
        
          this.getTotals(this.cctransferdatalist);
        }
        else{
          this._noData = true;
        }
       
    },
    error => {
      console.log("Read Cross Currency Transfer Error >>> "+error)
      debugger;     
      this.loading = false;
    });
  }

  getTotals(datalist){

    this.totalBuyLCY_Amt = 0;
    this.totalBuyFCY_Amt = 0;
    this.totalSellFCY_Amt= 0;
    this.totalSellLCY_Amt= 0;

    datalist.forEach(data => {
      this.totalBuyLCY_Amt +=  data.buy_lcyamount;
      this.totalBuyFCY_Amt +=  data.buy_fcyamount;
      this.totalSellFCY_Amt += data.sell_fcyamount;
      this.totalSellLCY_Amt += data.sell_lcyamount;
    });
  }

  exportPDF(){

    this.error="";
  this.loading = true;
 
  this.http.export_PDF("/fttransaction/exportCrossCcyTransferPDF?date="+this.month+"&branch="+  this.branch).pipe(
    map((data: any) => {
      
      let blob = new Blob([data], {
        type: "application/pdf"
      });
      var a = document.createElement("a");
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      a.href = fileURL;
      a.target     = '_blank'; 
      a.download = "CrossCurrencyFundTransfer_" + this.month + ".pdf";
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
  

}
