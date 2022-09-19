import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-ir-dawingencash',
  templateUrl: './ir-dawingencash.component.html',
  styleUrls: ['./ir-dawingencash.component.css']
})
export class IrDawingencashComponent implements OnInit {
 
  loading;
  error;
  _showData;
  _datalist;
  _refData;
  _rptTitle;

  fromDate : Date;
  toDate : Date;
  branchList;
  amountList: Array<{code: string, description: string}> = []; 

  constructor(private http:HttpService) { }

  ngOnInit() {
    this.amountList.push({"code" :"-", "description" : "-"});
    this.amountList.push({"code" :"1000", "description" : "1000"});
    this.amountList.push({"code" :"10000", "description" : "10000"});
    this.amountList.push({"code" :"100000", "description" : "100000"});
    this.amountList.push({"code" :"1000000", "description" : "1000000"});


  }

  readReference(){
    this.loading = true;
    this.http.doGet("/misreport/getAllMISCurrency").subscribe( resp => {
        this.loading = false;
        this.branchList = resp;
        
        if(this.branchList != null && this.branchList.length>0){
         
        }
        
    },
    err => {
      this.loading = false;
      debugger;
      console.log("Read getAllMISCurrency err");
    });

  }

}
