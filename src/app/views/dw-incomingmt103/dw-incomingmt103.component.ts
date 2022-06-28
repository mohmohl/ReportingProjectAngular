import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/services/HttpService';
//import { jsPDF } from "jspdf";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dw-incomingmt103',
  templateUrl: './dw-incomingmt103.component.html',
  styleUrls: ['./dw-incomingmt103.component.css']
})


 
export class DwIncomingmt103Component implements OnInit  {


  @ViewChild('content', { static: false }) pdfcontent: ElementRef;
  

  branch : string;
  currency : string;
  month : string;
  rmtbank : string = "ALL";
  authStatus : string = 'A';
  ccyList = [];
  monthList = [];
  incomingmt103list = [];
  totalAmount=0;
  totalCommission=0;
  loading;
  error;
  titleCCy : string;

  _showData = false;

  branchData : any;


  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.readReferenceData();
  }

  readReferenceData(){
    this.loading = true;
    //read months
    this.http.doGet('/fttransaction/getMonthNameList').subscribe(res=>{
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
          this.changeCurrencyCode(0) ;
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

    this.http.doGet("/fttransaction/getBranchSetup?branch="+ this.branch).subscribe(
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
      
  }

  showDatas(){
    this.loading = true;
    this.http.doPost("/fttransaction/getIncomingMT103DataList?date="+this.month+"&ccy="+this.currency+"&branch="+
    this.branch+"&rmtBank="+this.rmtbank+"&status="+this.authStatus, "Incoming MT 103 Message").subscribe(
      res => {
        this.loading = false;
        this.incomingmt103list = res;
        if(this.incomingmt103list != null){
          this._showData = true;
          this.titleCCy = this.currency;
          this.getTotals();
        }
        
      },
      error => {
        console.log("Read Incoming MT 103 Error >>> "+error)
        debugger;
        this.loading = false;
      }

    );
  }

  getTotals(){
    for(let i=0; i<this.incomingmt103list.length;i++){
      this.totalAmount += this.incomingmt103list[i].cr_amount;
      this.totalCommission += this.incomingmt103list[i].comission;
    }
  }
/*
  downloadPDF(){
    let content=this.pdfcontent.nativeElement;  
    let doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [4, 2]
    });  
    let _elementHandlers =  
    {  
      '#editor':function(element,renderer){  
        return true;  
      }  
    };  

    doc.html(content, {
      callback: (doc) => {
        doc.output("dataurlnewwindow");
      }
   });
    doc.save('Incoming MT 103_'+this.month+'_'+this.branch+'.pdf');  
  }

  exportPDF(){
   
  this.error="";
  this.loading = true;
 
  this.http.doGet("/fttransaction/exportIncomingMT103PDF?date="+this.month+"&ccy="+this.currency+"&branch="+
    this.branch+"&rmtBank="+this.rmtbank+"&status="+this.authStatus).pipe(
    map((data: any) => {
      let blob = new Blob([data], {
        type: "application/pdf"
      });
      var a = document.createElement("a");
      document.body.appendChild(a);
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      a.href = fileURL;
      a.target     = '_blank'; 
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
*/
exportPDF(){
  
}
}
