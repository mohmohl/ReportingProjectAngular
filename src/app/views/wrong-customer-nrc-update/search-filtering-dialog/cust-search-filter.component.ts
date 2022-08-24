import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocUploadService } from 'src/services/DocUploadService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocSearchData } from 'src/models/DocSearchData';
import { WrongCustomerData } from 'src/models/WrongCustomerData';
import { WrongCustomerNrcService } from 'src/services/WrongCustomerNrcService';

@Component({
  selector: 'app-mab-nrc-update-customer-search-filter',
  templateUrl: './cust-search-filter.component.html',
  styleUrls: ['./cust-search-filter.component.css']
})
export class CustomerSearchFilterComponent {
  dataList: WrongCustomerData[];
  loading = false;
  error = '';
  searchStr='';
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  editForm = new FormGroup({
    searchStr: new FormControl('', Validators.required),
  });
  
  constructor(
    public activeModal: NgbActiveModal,
    private service:WrongCustomerNrcService
    ) {

    }

  cancel(): void {
    this.activeModal.dismiss();
  }

  search():void{
    this.loading = true;
    this.error = "";

    this.searchStr = this.editForm.get(["searchStr"])!.value;
    if (this.editForm.invalid) {
      this.error = "Filter value is required";
      this.loading = false;
      return;
    }else {
      this.dataList = [];
       this.service.searchCustomer(this.searchStr).subscribe(
        (res :  WrongCustomerData[]) => { 
          this.loading = false;
          this.dataList = res;
        },
        error => {
          this.loading = false;
      }); 
    }
    
    }

    select(data: WrongCustomerData):void{
      this.passEntry.emit(data.customerNo);
      this.activeModal.dismiss();
    }
}
