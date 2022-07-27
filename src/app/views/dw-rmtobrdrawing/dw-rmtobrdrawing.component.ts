import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-rmtobrdrawing',
  templateUrl: './dw-rmtobrdrawing.component.html',
  styleUrls: ['./dw-rmtobrdrawing.component.css']
})
export class DwRmtobrdrawingComponent implements OnInit {
  
  loading;
  error;
  _showData;
  _noData;
  l_branch;
  monthList;
  month;
  month_desc;
  cusID = 'ALL';
  g_rmtobrdrawingdatalist;
  subDrAmt : number = 0;
  subComm1 : number = 0;
  subComm2 : number = 0;
  subFaxCharges : number = 0;
  grandDrAmt : number = 0;
  grandComm1 : number = 0;
  grandComm2 : number = 0;
  grandFaxCharges : number = 0;

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

    
    this.http.doGet("/fttransaction/getRMTOBRDrawingMonth").subscribe(
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
    const map = new Map();
    list.forEach((item) => {
        
          this.grandDrAmt += item.dr_amount;
          this.grandComm1 += item.commission1;
          this.grandComm2 += item.commission2;
          this.grandFaxCharges += item.fax_charges;
          
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
  this.cdf.reattach();
  this.loading = true;
  this.http.doPost("/fttransaction/getRMTOBRDrawingDatalist?date="+this.month+"&cusid="+this.cusID+"&branch="+ this.branchSetupData.branch_code,"RMT OBR Drawing").subscribe(
    data => {
      if(data != null){
        this.clearProperties();
        this.month_desc = this.month;
        
        this.g_rmtobrdrawingdatalist  = this.groupBy(data, typedata => (typedata.trn_dt +"|"+ typedata.type));
     
        this._showData = true;
        this._noData = false;
      }else{
        this._showData = false;
        this._noData = true;
      }
      this.loading = false;
      
    },
    error => {
      this.loading = false;
    }
  );
}

clearSubTotal(){
  
  this.subDrAmt = 0;
  this.subComm1 = 0;
  this.subComm2 = 0;
  this.subFaxCharges = 0;
}

calculateTotal(data){
  this.subDrAmt += data.dr_amount;
  this.subComm1 += data.commission1;
  this.subComm2 += data.commission2;
  this.subFaxCharges += data.fax_charges;
 
}

clearProperties(){
  this.clearSubTotal();
  this.grandDrAmt = 0;
  this.grandComm1 = 0;
  this.grandComm2 = 0;
  this.grandFaxCharges = 0;

  this.g_rmtobrdrawingdatalist = [];
}

  exportPDF(){
    this.error="";
    this.loading = true;
  
    let fileName = "RMTOBRDrawing_" + this.branchSetupData.branch_code+"_"+this.month + ".pdf";
    this.http.generatePost_PDF("/fttransaction/exportRMTOBRDrawingPDF?date="+this.month+"&cusid="+this.cusID,this.branchSetupData,
    fileName).subscribe(
        res => {this.loading = false; },
        error => {
          console.log("Remittance Drawing (OBR) Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate Remittance Drawing (OBR)!.. Have the error)";
            }
          this.loading = false;
        });
        

  }

}
