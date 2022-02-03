import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocCategory } from 'src/models/DocCategory';
import { DocUploadService } from 'src/services/DocUploadService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocSearchData } from 'src/models/DocSearchData';

@Component({
  selector: 'app-mab-doc-upload-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  category:DocCategory;
  dataList: DocSearchData[];
  loading = false;
  error = '';
  searchStr='';
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  editForm = new FormGroup({
    searchStr: new FormControl('', Validators.required),
  });
  
  constructor(
    public activeModal: NgbActiveModal,
    private service:DocUploadService
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
      this.error = this.category.colName1+" is required";
      this.loading = false;
      return;
    }else {
      this.dataList = [];
      this.service.search(this.category.value, this.searchStr).subscribe(
        (res :  DocSearchData[]) => { 
          this.loading = false;
          this.dataList = res;
        },
        error => {
          this.loading = false;
      });
    }
    
    }

    select(data: DocSearchData):void{
      this.passEntry.emit(data.colName1);
      this.activeModal.dismiss();
    }
}
