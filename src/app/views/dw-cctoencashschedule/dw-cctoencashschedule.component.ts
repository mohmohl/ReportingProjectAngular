import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-cctoencashschedule',
  templateUrl: './dw-cctoencashschedule.component.html',
  styleUrls: ['./dw-cctoencashschedule.component.css']
})
export class DwCctoencashscheduleComponent implements OnInit {

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
  trn_date;
  g_cctoencashdatalist;
  subTotal : number = 0;
  grandTotal : number = 0;
  idx : number = 0;

  constructor(private http : HttpService, private cdr: ChangeDetectorRef) {  }
  //this.cdr.detach();
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

    //
    this.http.doGet("/fttransaction/getCCTOEncashMonth").subscribe(
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
    this.subTotal = this.subTotal + data.instr_amount;
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
    this.g_cctoencashdatalist = [];
    this.idx = 0;
    this.cdr.reattach();

    this.http.doPost("/fttransaction/getCCTOEncashDatalist?date="+this.month+"&cusid="+this.cusID+"&branch="+ this.branchSetupData.branch_code,"CCTO Encash Schedule").subscribe(
      data => {
        if(data != null){
          this.trn_date = data[0].trn_date;
            
          this.g_cctoencashdatalist  = this.groupBy(data, otherbranch => (otherbranch.trn_date +"|"+ otherbranch.other_branch));
       
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
        
      this.grandTotal = this.grandTotal + item.instr_amount;
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
  
    this.http.export_POST_PDF("/fttransaction/exportCCTOEncashPDF?date="+this.month+"&cusid="+this.cusID,this.branchSetupData).pipe(
      map((data: any) => {
        
        let blob = new Blob([data], {
          type: "application/pdf"
        });
        var a = document.createElement("a");
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL;
        a.target     = '_blank'; 
        a.download="CCTOEncashSchedule_" + this.branchSetupData.branch_code+"_"+this.month + ".pdf";
        document.body.appendChild(a);
        a.click();
      })).subscribe(
        res => {this.loading = false; },
        error => {
          console.log(" CCTO Encash Schedule Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate CCTO Encash Schedule!.. Have the error)";
            }
          this.loading = false;
        });
        
}


}
