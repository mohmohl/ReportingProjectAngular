import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { WrongCustomerNrcService } from 'src/services/WrongCustomerNrcService';
import { map } from 'rxjs/operators';

import * as nrcData from '../../../json/nrc.json';
import { NgbTabset, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WrongCustomerNrcFilter } from 'src/models/WrongCustomerNrcFilter';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { WrongCustomerNrcResponse } from 'src/models/WrongCustomerNrcResponse';
import { CustomerSearchFilterComponent } from '../search-filtering-dialog/cust-search-filter.component';
import { WrongCustomerData } from 'src/models/WrongCustomerData.js';

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

@Component({
  selector: 'app-wrong-cust-nrc-update',
  templateUrl: './wrong-cust-nrc-update.component.html',
  styleUrls: ['./wrong-cust-nrc-update.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class WrongCustomerNRCUpdateComponent implements OnInit {
  loading = false;
  error = '';
  message = '';
  

  editForm = new FormGroup({
    customerNo: new FormControl('', ),
    nrcNo: new FormControl('', ),
    nrcState: new FormControl('1', Validators.required),
    nrcPrefix: new FormControl('',Validators.required),
    nrcCitizen: new FormControl('(C)',Validators.required ),
    newNrcNo: new FormControl('',[Validators.required,  Validators.pattern('^[0-9]{6}$')] ),
  });

  //branchList: BranchData[];

  stateList:any;
  nrcPrefixList:any=[];
  citizenList :any;

  filterData:WrongCustomerNrcFilter = new WrongCustomerNrcFilter();
  dataRes:WrongCustomerNrcResponse = new WrongCustomerNrcResponse();
  customerNo = '';
  customerFlag = false;
  customerNo_flag = 'NO';
  
  @ViewChild('tabSet',{ static: false })
  private tabs:NgbTabset;

  constructor(
    private service:WrongCustomerNrcService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
   // this.loading = true;
   // this.getAllBranchList();
    this.stateList = nrcData.stateList;
    this.citizenList = nrcData.citizenList;
    this.bindNrcPrefix('1');
  }

  ngAfterViewInit() {
    this.tabs.select('tab-2');
  }

  bindNrcPrefix(id: any):void {
    this.nrcPrefixList = nrcData.nrcPrefixList.filter((data:any)=> data.id_eng === id)
                          .sort((a:any, b:any) => (a.code_eng <b.code_eng?-1:1));
    this.editForm.controls['nrcPrefix'].setValue(this.nrcPrefixList[0].code_eng);
    console.log("bind nrc prefix...");
  }


  onStateChange(event: any):void{
    console.log("State Change...");
    this.bindNrcPrefix(event.target.value);
  }
 
  /*
  getAllBranchList() :void{
    this.service.getAllBranchList().subscribe(
            (res :  BranchData[]) => { 
              this.loading = false;
              this.branchList = res;
            },
            error => {
              this.loading = false;
     });
  }
  */
  searchCustomer():void {
    const modalRef = this.modalService.open(CustomerSearchFilterComponent, { size: 'lg', backdrop: 'static' });
    //modalRef.componentInstance.category = this.category;
    modalRef.componentInstance.passEntry.subscribe((customerNo) => {
      this.editForm.controls['customerNo'].setValue(customerNo);
    });
  }

  search():void {
    
    this.filterData.customerNo = this.editForm.get(["customerNo"])!.value.trim();
    this.filterData.nrcNo = this.editForm.get(["nrcNo"])!.value.trim();
    this.filterData.userId = this.authService.currentUserValue.userId;
    this.filterData.customerNoFlag = this.customerNo_flag;
    this.loading = true;
    this.clearForm();
    
    if((this.filterData.customerNo === '' || this.filterData.customerNo == null)){
      this.error = "Please fill Customer No. or NRC No.";
      this.loading = false;
    }else{
      this.service.search(this.filterData).subscribe(
        (res :  any) => { 
          this.loading = false;
          if(res != null){
              if(res.msgCode ==='0000'){
                this.dataRes = res;
              }else if(res.msgCode ==='0013'){
                this.message = res.msgDesc;
              }else{
                this.error = res.msgDesc;
              }
            
          }else {
            this.loading = false;
            this.error = "Internal Server Error";
          }
        },
        (error) => {
          this.loading = false;
          this.error = "Internal Server Error";
        });
    }
    
  }

  update():void {
    this.error = "";
    this.message = "";
    this.customerFlag = false;
    if(this.editForm.valid){
      //this.message = this.bindNrcData();
      if(this.dataRes.customerData.length <1){
        this.error = "Please Choose Customer";
      }
      
      this.dataRes.customerData.forEach((data)=> {
        if(data.usage === 'USED'){
          data.newNrcNo = this.bindNrcData();
          this.customerFlag = true;
        }else{
          data.xref = this.customerNo;
        }
      });

      if(this.customerFlag === false){
        this.error = "Please Choose One Customer As Parmanent";
      }else {
        this.loading = true;
        this.service.update(this.dataRes.customerData).subscribe(
          (res :  any) => { 
            this.loading = false;
            if(res != null){
                if(res.msgCode ==='0000'){
                  this.message = "Updated Successfully";
                }else{
                  this.error =  "Failed to update";
                }
              
            }else {
              this.loading = false;
              this.error = "Internal Server Error";
            }
          },
          (error) => {
            this.loading = false;
            this.error = "Internal Server Error";
          });
      }
    }else{
      this.error = "Invalid NRC.";
    }
  }

  bindNrcData():string {
    return this.editForm.get(['nrcState'])!.value+'/'+this.editForm.get(['nrcPrefix'])!.value+
            this.editForm.get(['nrcCitizen'])!.value+this.editForm.get(['newNrcNo'])!.value;
  }

  getAddress(data: any):String{
    return data.addressLine1 + ", " + data.addressLine2 +", " + data.addressLine3 +", " + data.addressLine4;
  }

  formatMoney(n:any):string {
    return (+n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  }

  onCustomerCheckedChange(e : any): void {
    this.dataRes.customerData.forEach((data)=> {
      data.usage = "NOT USED";
      if(data.customerNo === e.target.value){
        if (e.target.checked) {
          this.editForm.controls['nrcNo'].setValue(data.nrc);
          this.showNrc(data);
          data.usage = "USED";
          data.checkFlag = true;
          this.customerNo = data.customerNo;
        }
        else{
          this.editForm.controls['nrcNo'].setValue('');
          this.clearNRCData() ;
          data.checkFlag = false;
          data.usage = "NOT USED";
          
        } 
      }else{
        data.checkFlag = false;
      }
    });
  }

  showNrc(data: WrongCustomerData):void {
    var nrc_pattern= /^([0-9]{1,2})\/[a-zA-Z]{6,9}\([a-zA-Z]{1,3}\)([0-9]{6})$/;
    //this.message = "Pattern___" + nrc_pattern.test(this.editForm.get(['nrcNo'])!.value);
    if(nrc_pattern.test(this.editForm.get(['nrcNo'])!.value)){
      var strList = data.nrc.split("/");
      var nrcPreList = strList[1].split("(");
      //this.message = JSON.stringify(strList) +"Pre List" +JSON.stringify(nrcPreList); 
      var state = parseInt(strList[0])+"";
      var prefix = nrcPreList[0];
      var citizen = "("+ nrcPreList[1].substring(0,2);
      var nrcNo = nrcPreList[1].substring(2,8);

      //this.message = state + prefix + citizen + nrcNo;
      this.bindNrcPrefix(state);
      this.editForm.controls['nrcState'].setValue(state);
      this.editForm.controls['newNrcNo'].setValue(nrcNo);      
      
      if (citizen === '(N)' && data.remark !=='USED') citizen = '(C)';
      this.editForm.controls['nrcCitizen'].setValue(citizen);
      
      /* this.nrcPrefixList = nrcData.nrcPrefixList.filter((data:any)=> data.id_eng === state)
              .sort((a:any, b:any) => (a.code_eng <b.code_eng?-1:1)); */
      this.editForm.controls['nrcPrefix'].setValue(prefix); 

    }
   // nrc_pattern.test(data.nrc);
    //console.log("Pattern___" + nrc_pattern.test(this.editForm.get(['nrcNo'])!.value));
   /*  var strList = data.nrc.split("/");
    this.message = JSON.stringify(strList); */

  } 
  
  onCustomerNoChange(e : any): void {
    if (e.target.checked) {
      this.customerNo_flag = 'YES';
    } else{
      this.customerNo_flag = 'NO';
    }
  }
    
    clearForm() :void {
      this.clearNRCData();
      this.error = "";
      this.message = "";
      this.dataRes =new WrongCustomerNrcResponse();
    }
    
    clearNRCData() :void {
      this.editForm.controls['nrcState'].setValue('1');
      this.editForm.controls['nrcPrefix'].setValue('');
      this.editForm.controls['nrcCitizen'].setValue('(C)');
      this.editForm.controls['newNrcNo'].setValue('');
      this.bindNrcPrefix('1');
    }

} 
