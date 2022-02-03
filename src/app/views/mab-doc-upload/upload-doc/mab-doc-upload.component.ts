import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { DocUploadService } from 'src/services/DocUploadService';
import { DocCategory } from 'src/models/DocCategory';
import { of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchFilterComponent } from '../search-filtering-dialog/search-filter.component';
import { BranchData } from 'src/models/BranchData';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { DocUploadResponse } from 'src/models/DocUploadResponse';

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
  selector: 'app-mab-doc-upload',
  templateUrl: './mab-doc-upload.component.html',
  styleUrls: ['./mab-doc-upload.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class MABDocUploadComponent implements OnInit {
  loading = false;
  error = '';
  message = '';

  editForm = new FormGroup({
    branch: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    accountNo: new FormControl('', Validators.required),
    //flexcubeFinalFilePath: new FormControl('',),
  });

  categoryList: DocCategory[];
  category:DocCategory;
  branchData: BranchData;

  fileList: File[] =[];

  constructor(
    private service:DocUploadService,
    private modalService: NgbModal,
    private authService: AuthenticationService,
    ) { }

  ngOnInit() {
    this.loading = true;
    this.getCategoryList();
    this.getBranchByUser();
  }
 
  getCategoryList() :void{
    this.service.getCategoryList().subscribe(
            (res :  DocCategory[]) => { 
              this.loading = false;
              this.categoryList = res;
            },
            error => {
              this.loading = false;
     });
    }

  getBranchByUser() :void{
    this.service.getBranchByUser(this.authService.currentUserValue.userId).subscribe(
      (res :  BranchData) => { 
        this.loading = false;
        this.branchData = res;
        this.editForm.controls['branch'].setValue(res.homeBranch+' - '+ res.branchName);
      },
      error => {
        this.loading = false;
     });
  }

    onCategoryChange(event : any): void {
     for(const item of this.categoryList){
        if(item.value === event.target.value)
            this.category = item;
     }
    }

    search():void {
      const modalRef = this.modalService.open(SearchFilterComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.category = this.category;
      modalRef.componentInstance.passEntry.subscribe((accountNo) => {
        this.editForm.controls['accountNo'].setValue(accountNo);
      })
    }

    getExtension(fileName: string): string {
      return fileName.substring(fileName.lastIndexOf('.'));
    }
  
    validateExtension(extension: string):boolean {
      extension = extension.toLowerCase();
      if (extension ===".pdf")
        return true;
      else return false;
    }

    checkFileFormat(event: any): boolean {
      var ret = true;
      for(let file of event.target.files){
        if(!this.validateExtension(this.getExtension(file.name))){
          ret = false;
          break;
        }
      }
      return ret;
    }

    selectFiles(event: any) :void {
      this.error = "";
      /* if(!this.checkFileFormat(event)){
          this.error = "Invalid File Format. System only accepts PDF format";
      }else{
        for(let file of event.target.files){
          this.fileList.push(file);
        }
        //this.fileList = event.target.files;
      } */

      for(let file of event.target.files){
        this.fileList.push(file);
      }
    }

    removeFile(index) :void {
      if (index !== -1) {
        this.fileList.splice(index, 1);
      } 
    }

    uploadFile() :void {
      this.loading = true;
      this.error = "";
      this.message = "";
      if(this.editForm.invalid || this.fileList.length === 0) {
        this.loading = false;
        this.error = "Please select the required fields."
      }else {
        var userId = this.authService.currentUserValue.userId;
        this.service.uploadFile(this.fileList,
                                this.branchData.userId,
                                this.branchData.homeBranch,
                                this.branchData.branchName,
                                this.editForm.get(['category'])!.value,
                                this.editForm.get(['accountNo'])!.value,
                                ).subscribe(
                                (res :  DocUploadResponse) => { 
                                  this.loading = false;
                                  JSON.stringify("Response......... "+res);
                                  if(res.msgCode === '0000'){
                                    this.error = "";
                                    this.message = "Upload Successfully."
                                  }else {
                                    this.message = "";
                                    this.error = res.msgDesc;
                                  }
                                 
                                },
                                (error) => {
                                  this.loading = false;
                                  this.message = "";
                                  this.error = "Cannot Upload!";
                                });
      }
    }


} 
