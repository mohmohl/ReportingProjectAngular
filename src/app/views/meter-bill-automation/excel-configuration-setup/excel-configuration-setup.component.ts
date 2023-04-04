import { DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeterBillConfigHeader } from 'src/models/MeterBillConfigHeader';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { MeterBillAutomationService } from 'src/services/MeterBillAutomationService';
import { ExcelColumnAddingComponent } from '../excel-column-adding-dialog/excel-column-adding.component';


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
  selector: 'app-excel-configuration-setup',
  templateUrl: './excel-configuration-setup.component.html',
  styleUrls: ['./excel-configuration-setup.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class ExcelConfigurationSetupComponent implements OnInit {
  loading = false;
  error = '';
  message = '';

  /* editForm = new FormGroup({
    configName: new FormControl('',),
    headerRowNo: new FormControl('',),
    ledgerNo: new FormControl('',),
    removeLastRow: new FormControl('YES',)
  }); */

  editForm = this.fb.group({
    id: [],
    configName: ['', [Validators.required, Validators.maxLength(50)]],
    headerRowNo: ['', [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]],
    removeLastRow: ['YES', [Validators.required]],
  });

  colList = [
    {"value":"","caption":"","separator":"","colName":"ledger_no","label":"Ledger No."},
    {"value":"","caption":"","separator":"","colName":"meter_no","label":"Meter No."},
    {"value":"","caption":"","separator":"","colName":"bill_no","label":"Bill No."},
    {"value":"","caption":"","separator":"","colName":"customer_id","label":"Customer Id"},
    {"value":"","caption":"","separator":"","colName":"customer_name","label":"Customer Name"},
    {"value":"","caption":"","separator":"","colName":"address","label":"Address"},
    {"value":"","caption":"","separator":"","colName":"last_payment_date","label":"Last Payment Date"},
    {"value":"","caption":"","separator":"","colName":"unit","label":"Unit"},
    {"value":"","caption":"","separator":"","colName":"amount","label":"Amount"},
    {"value":"","caption":"","separator":"","colName":"service_charges","label":"Service Charges"},
    {"value":"","caption":"","separator":"","colName":"horse_power_charges","label":"Horse Power Charges"},
    {"value":"","caption":"","separator":"","colName":"discount","label":"Discount"},
    {"value":"","caption":"","separator":"","colName":"last_balance","label":"Last Balance"},
    {"value":"","caption":"","separator":"","colName":"sub_total","label":"Sub Total"},
    {"value":"","caption":"","separator":"","colName":"debt","label":"Debt"},
    {"value":"","caption":"","separator":"","colName":"wiring_charges","label":"Wiring Charges"},
    {"value":"","caption":"","separator":"","colName":"grand_total","label":"Grand Total"}
  ];

  
  data :MeterBillConfigHeader = new MeterBillConfigHeader();
  constructor(
    private service:MeterBillAutomationService,
    private modalService: NgbModal,
    protected fb: FormBuilder,
    public datepipe: DatePipe
    ) { }

  ngOnInit() {
    //this.loading = true;
   
  }
 
  addColumn(index: any):void {
    
    const modalRef = this.modalService.open(ExcelColumnAddingComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.passEntry.subscribe((data: any) => {
        this.colList[index].value = "";
        this.colList[index].caption = "";
        this.colList[index].separator = data.separator;
        if(data.cols.length>1){
          let separator = "";
          if(data.separator ==='space'){
          separator = " ";
          }else if(data.separator ==='slad'){
          separator = "/";
          }else if(data.separator ==='comma'){
          separator = ",";
          }else{
          separator = "";
          }
          let i = 0;
          data.cols.forEach(d => {
            if (this.colList[index].caption === '') {
              this.colList[index].value = data.cols[i];
              this.colList[index].caption = "COL["+data.cols[i]+"]";
            }
            else {
              this.colList[index].value = this.colList[index].value+"||"+data.cols[i];
              this.colList[index].caption = this.colList[index].caption + separator +"COL["+data.cols[i]+"]";
            } 
            i++;
          }); 
          
        }else{
          this.colList[index].value = data.cols[0];
          this.colList[index].caption = "COL["+data.cols[0]+"]";
        }
    });
  }

  validateNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  
  save():void {
    this.loading = true;
    this.error = "";
    this.message = "";
    if(this.editForm.valid){
      console.log("form is valid");
      this.data.id = null;
      this.data.configName = this.editForm.get(["configName"])!.value.trim();
      this.data.headerRowNo = this.editForm.get(["headerRowNo"])!.value.trim();
      this.data.removeLastRow = this.editForm.get(["removeLastRow"])!.value.trim();

      this.colList.forEach(d => {
        this.data.details.push({id:null,headerId:null,columnName:d.colName,mappingColumn:d.value,separator:d.separator});
      });

      this.service.saveConfig(this.data).subscribe(
        (res :  any) => { 
          this.loading = false;
          if(res != null){
              if(res.msgCode ==='0000'){
                this.message = "Saved Successfully";
              }else{
                this.error =  res.msgDesc;
              }
            
          }else {
            this.loading = false;
            this.error = "Internal Server Errorrrrrr";
          }
        },
        (error) => {
          this.loading = false;
          console.log(JSON.stringify(error));
          this.error = "Internal Server Errorsdf";
        });
    }
  }
   
    
} 
