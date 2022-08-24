import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-dw-remittance',
  templateUrl: './dw-remittance.component.html',
  styleUrls: ['./dw-remittance.component.css']
})
export class DwRemittanceComponent implements OnInit {

  loading;
  error;
  _showData;
  _noData;
  l_branch;
  monthList;
  month;
  month_desc;
  remittancedatalist = [];

  _grandTotal = 0;

  brCode = "";
  branchSetupData= {"bank_name" : "", "branch_name" : "" , "branch_code" : ""};

  constructor(private http:HttpService, private cdf : ChangeDetectorRef) { }

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

  clearProperties()
  {
    this.remittancedatalist = [];
    this._grandTotal = 0;
  }  
  
  showDatas(){
    this.cdf.reattach();
    this.loading = true;
    this.clearProperties();
    this.http.doPost("/fttransaction/getRemittanceDatalist?date="+this.month+"&branch="+ this.branchSetupData.branch_code,"Remittance Report").subscribe(
      data => {
        if(data != null){
          this.month_desc = this.month;
          
          this.remittancedatalist  = data;
      
          this._showData = true;
          this._noData = false;

          this.calculateTotal(this.remittancedatalist);
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

  calculateTotal(datalist){
    datalist.forEach(element => {
      this._grandTotal = this._grandTotal + element.lcy_amount;
    });
  }


  exportPDF(){
    this.error="";
    this.loading = true;
  
    let fileName = "Remittance_" + this.branchSetupData.branch_code+"_"+this.month + ".pdf";
    this.http.generatePost_PDF("/fttransaction/exportRemittancePDF?date="+this.month,this.branchSetupData,
    fileName).subscribe(
        res => {this.loading = false; },
        error => {
          console.log("Remittance Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate Remittance !.. Have the error)";
            }
          this.loading = false;
        });
        

  }

}
