import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-cctodrawing',
  templateUrl: './dw-cctodrawing.component.html',
  styleUrls: ['./dw-cctodrawing.component.css']
})
export class DwCctodrawingComponent implements OnInit {

  loading;
  error;
  branchList = [];
  branch_code;
  branch_name;
  auth = 'A';
  drawingtype = 'ALL';

  monthList = [];
  month;
  month_str;

  _showData;
  _noData;

  drawingcctodatalist = [];
  g_drawingcctodatalist : any;

  grandDrAmt : number = 0;
  grandComm1 : number = 0; 
  grandComm2 : number = 0;
  grandComm3 : number = 0;
  grandTotal : number = 0;

  subDrAmt : number = 0;
  subComm1 : number = 0; 
  subComm2 : number = 0;
  subComm3 : number = 0;
  subTotal : number = 0;

  totNoOfTrans : number = 0;

  constructor(private http: HttpService, private cdf : ChangeDetectorRef) { }

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

          this.branchList.push({"branch_code":"ALL","branch_name":"ALL","bank_name":"Myanma Apex Bank","branch_addr2":"","branch_addr3":"","selected":false});
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );

    //
    this.http.doGet("/fttransaction/getOBRCCTODrawingMonth").subscribe(
      data => {
        if(data != null){
          this.monthList = data;
          this.month = this.monthList[0];
          this.month_str = this.monthList[0];
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
        this.grandDrAmt += item.dr_amount;
        this.grandComm1 += item.comm1;
        this.grandComm2 += item.comm2;
        this.grandComm3 += item.comm3;

         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    this.grandTotal =  this.grandDrAmt +  this.grandComm1 + this.grandComm2 + this.grandComm3;
    return (map);
}

changeDateCombo(index){
  this.cdf.detach();
}

changeBranchCombo(index){
  this.cdf.detach();
  this.branch_code = this.branchList[index].branch_code;
  this.branch_name = this.branchList[index].branch_name;
}

  clearProperties(){
    this.grandDrAmt = 0;
    this.grandComm1 = 0;
    this.grandComm2 = 0;
    this.grandComm3 = 0;

    this.loading = true;
    this._showData = false;
    this._noData = false;
    this.drawingcctodatalist = [];

    this.clearSubTotal();
  }

  showDatas(){
    this.cdf.reattach();
    this.clearProperties();
    this.month = this.month_str;
    this.http.doPost("/fttransaction/getCCTODrawingDatalist?branch="+this.branch_code
    +"&date="+this.month+"&auth="+this.auth+"&drawingtype="+this.drawingtype,"CCTO Drawing Schedule").subscribe(
      data => {
        if(data != null){
          this.month_str = this.month;

          this.totNoOfTrans = data.length;
          this._showData = true;
          
          let result = Array.from(new Set(data.map(x => x.other_bank_name)));
          
          this.g_drawingcctodatalist  = this.groupBy(data, otherbank => (otherbank.trns_dt + '|'+ otherbank.other_bank_name));
          
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
    this.subDrAmt += data.dr_amount;
    this.subComm1 += data.comm1;
    this.subComm2 += data.comm2;
    this.subComm3 += data.comm3;

    let total = data.dr_amount + data.comm1 + data.comm2 + data.comm3;
    this.subTotal += total;
    return total;
  }

  clearSubTotal(){
   
    this.subDrAmt = 0;
    this.subComm1  = 0;
    this.subComm2  = 0;
    this.subComm3  = 0;
    this.subTotal = 0;
  }

  exportPDF(){
    this.error="";
    this.loading = true;
  
    this.http.export_PDF("/fttransaction/exportCCTODrawingPDF?date="+this.month+"&auth="+this.auth+"&drawingtype="+this.drawingtype+"&branch="+
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
        a.download="CCTODrawing_" + this.branch_code+"_"+this.month + ".pdf";
        document.body.appendChild(a);
        a.click();
      })).subscribe(
        res => {this.loading = false; },
        error => {
          console.log(" CCTO Drawing Schedule Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate CCTO Drawing Schedule!.. Have the error)";
            }
          this.loading = false;
        });
        
  }

  exportExcel() {
   
    this.loading = true;

    let requestBody = {
      date : this.month,
      branch: this.branch_code,
      t1: this.drawingtype,
      t2: this.auth,
      filetype:"xlsx"
    };

    this.http.downloadFile("/fttransaction/exportCCTODrawingFile", requestBody, `CCTO Drawing Schedule_${this.branch_code}_${this.month}`, 'xlsx').subscribe(
      (data: any) => {
        this.loading = false;
      },error => {
        console.log("CCTO Drawing Schedule Excel Exporting Error >>> " + error)
        if (error != "") {
          this.error = "(The system cannot export CCTO Drawing Schedule excel file!.. Have the error)";
        }
        this.loading = false;
      });

  }

}
