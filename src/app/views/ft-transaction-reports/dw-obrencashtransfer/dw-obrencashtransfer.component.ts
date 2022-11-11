import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-obrencashtransfer',
  templateUrl: './dw-obrencashtransfer.component.html',
  styleUrls: ['./dw-obrencashtransfer.component.css']
})
export class DwObrencashtransferComponent implements OnInit {

  loading;
  error;
  _showData;
  _noData;
  l_branch;
  branchCode;
  branchSetupData= {"bank_name" : "", "branch_name" : "" , "branch_code" : ""};
  monthList;
  month;
  cusID = 'ALL';
  g_obrencashtransferdatalist;
  subTotal : number = 0;
  grandTotal : number = 0;
  idx : number = 0;

  totNoOfTrans : number = 0;

  constructor(private http : HttpService, private cdr: ChangeDetectorRef) {  }
  
  ngOnInit(): void {
    this.readReference();    
  }
 
  readReference(){
    this.loading = true;
    this.http.doGet("/fttransaction/getAllBranchList").subscribe(
      data => {
        if(data != null && data.length > 0){
          this.l_branch = data;
          this.changeBranchCombo(0);
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );

    
    this.http.doGet("/fttransaction/getOBREncashTransferMonth").subscribe(
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

  getIndex(){
    this.idx = this.idx + 1;
    return this.idx;
  }

  calculateSubTotal(data){
    this.subTotal = this.subTotal + data.dr_amount;
    this.grandTotal = this.grandTotal + data.dr_amount;;
    this.cdr.detach();  
  }

  clearSubTotal(){
    this.subTotal = 0;
  }

  changeBranchCombo(index) 
  {    
    this.branchCode = this.l_branch[index].branch_code;
    this.branchSetupData = this.l_branch[index];
  }

  showDatas(){
    this.loading = true;
    this._noData = false;
    this.subTotal = 0;
    this.grandTotal = 0;
    this.g_obrencashtransferdatalist = [];
    this.idx = 0;
    this.cdr.reattach();

    this.http.doPost("/fttransaction/getOBREncashTransferDatalist?date="+this.month+"&cusid="+this.cusID+"&branch="+ this.branchSetupData.branch_code,"OBR Encash Transfer").subscribe(
      data => {
        if(data != null){
          this.totNoOfTrans = data.length;
          //this.g_obrencashtransferdatalist  = this.groupBy(data, otherbranch => (otherbranch.trn_dt +"|" + otherbranch.internal_remarks + "|" +otherbranch.other_branch));
          this.g_obrencashtransferdatalist  = this.groupBy(data, otherbranch => (otherbranch.trn_dt + "|" +otherbranch.other_branch));
       
          this.loading = false;
          this._showData = true;
        }else{
          this.loading = false;
          this._showData = false;
          this._noData = true;
        }
        
      },
      error => {
        this.loading = false;
      }
    );
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

exportPDF(){
  this.error="";
    this.loading = true;
  
    this.http.export_POST_PDF("/fttransaction/exportOBREncashTransferPDF?date="+this.month+"&cusid="+this.cusID,this.branchSetupData).pipe(
      map((data: any) => {
        
        let blob = new Blob([data], {
          type: "application/pdf"
        });
        var a = document.createElement("a");
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL;
        a.target     = '_blank'; 
        a.download="OBREncashTransfer_" + this.branchSetupData.branch_code+"_"+this.month + ".pdf";
        document.body.appendChild(a);
        a.click();
      })).subscribe(
        res => {this.loading = false; },
        error => {
          console.log(" OBR Encash Transfer Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate OBR Encash Transfer!.. Have the error)";
            }
          this.loading = false;
        });
        
  }
}
