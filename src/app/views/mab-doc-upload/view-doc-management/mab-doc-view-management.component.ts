import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { DocUploadService } from 'src/services/DocUploadService';
import { DocCategory } from 'src/models/DocCategory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchData } from 'src/models/BranchData';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { DocUploadFilter } from 'src/models/DocUploadFilter';
import { DatePipe } from '@angular/common';
import { DocUploadData } from 'src/models/DocUploadData';
import { DocUploadResponse } from 'src/models/DocUploadResponse';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs/operators';
import * as fileSaver from 'file-saver';


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
  selector: 'app-mab-doc-view-management',
  templateUrl: './mab-doc-view-management.component.html',
  styleUrls: ['./mab-doc-view-management.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class MABDocViewManagementComponent implements OnInit {
  loading = false;
  error = '';
  message = '';

  editForm = new FormGroup({
    branch: new FormControl('0',),
    fromDate: new FormControl(new Date,),
    toDate: new FormControl(new Date,),
    category: new FormControl('0',),
    accountNo: new FormControl('',),
    userId: new FormControl('',),
  });

  categoryList: DocCategory[];
  //branchData: BranchData;
  branchList: BranchData[];
  filterData: DocUploadFilter = new DocUploadFilter();
  dataList: DocUploadData[];
  fromDate: Date;
  toDate: Date;

  constructor(
    private service:DocUploadService,
    private modalService: NgbModal,
    private authService: AuthenticationService,
    public datepipe: DatePipe
    ) { }

  ngOnInit() {
    this.loading = true;
    this.getCategoryList();
    this.getAllBranchList();
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

  /* getBranchByUser() :void{
    this.service.getBranchByUser(this.authService.currentUserValue.userId).subscribe(
      (res :  BranchData) => { 
        this.loading = false;
        this.branchData = res;
        this.editForm.controls['branch'].setValue(res.homeBranch+' - '+ res.branchName);
      },
      error => {
        this.loading = false;
     });
  } */

  
    search():void {
        this.fromDate = this.editForm.get(["fromDate"])!.value;
        this.toDate = this.editForm.get(["toDate"])!.value;

        if(this.editForm.get(["branch"])!.value ==='0'){
          this.filterData.branchCode = 'ALL';
        }else {
          this.filterData.branchCode = this.editForm.get(["branch"])!.value;
        }
        this.filterData.fromDate =  this.datepipe.transform(this.fromDate, 'dd-MMM-yyyy');
        this.filterData.toDate =  this.datepipe.transform(this.toDate, 'dd-MMM-yyyy');
        if(this.editForm.get(["category"])!.value ==='0'){
          this.filterData.category = 'ALL';
        }else {
          this.filterData.category = this.editForm.get(["category"])!.value;
        }
        this.filterData.accountNo = this.editForm.get(["accountNo"])!.value;
        this.filterData.userId = this.editForm.get(["userId"])!.value;

        this.loading = true;
        this.error ="";
        this.message = "";
        this.dataList = [];
        this.service.searchDocLog(this.filterData).subscribe(
        (res :  any) => { 
          this.loading = false;
          if(res != null){
            this.dataList = res;
            
          }else {
            this.message = "No Record Found";
          }
          console.log("dataList Length"+this.dataList.length)
        },
        (error) => {
          this.loading = false;
          this.error = "Internal Server Error";
        });
    }

    view(data: DocUploadData){
      this.loading = true;
      this.error ="";
      this.message = "";
      this.service.downloadDoc(data).pipe(
        map((res: any) => {
          this.openFile(res, 'application/pdf');          
          this.loading = false;
        })).subscribe(
          res => {this.loading = false; },
          error => {
            this.error ="The system cannot find the file path specified";
            this.loading = false;
          });
    }

    download(data: DocUploadData){
      this.loading = true;
      this.error ="";
      this.message = "";
      this.service.downloadDoc(data).pipe(
          map((res: any) => {
            this.saveFile(res, data.newFileName, 'application/pdf');          
            this.loading = false;
          })).subscribe(
            res => {this.loading = false; },
            error => {
              this.error ="The system cannot find the file path specified";
              this.loading = false;
            });
    }

    openFile(data: any, fileType?: string):void {
      const blob = new Blob([data], {type: fileType});
      const downloadURL = window.URL.createObjectURL(blob);
      window.open(downloadURL);
    }

    saveFile(data: any, fileName?: string,fileType?: string):void {
      const blob = new Blob([data], {type: fileType});
      fileSaver.saveAs(blob, fileName);
    }
    
    delete(data: DocUploadData){
      const modalRef = this.modalService.open(ConfirmDialogComponent, { size: 'xs', backdrop: 'static' });
      modalRef.componentInstance.title = "Confirm";
      modalRef.componentInstance.bodyMessage = "Are you sure to want to delete this record?";
      modalRef.componentInstance.status.subscribe((status) => {
        if(status === 'ok'){
          this.loading = true;
          this.error ="";
          this.message = "";
          data.updatedUserId = this.authService.currentUserValue.userId;
          this.service.deleteDoc(data).subscribe(
            (res :  DocUploadResponse) => { 
              this.loading = false;
              if(res.msgCode === '0000'){
                this.error = "";
                this.message = "Successfully Deleted."
                this.search();
              }else {
                this.message = "";
                this.error = res.msgDesc;
              }
            },
            (error) => {
              this.loading = false;
              this.message = "";
              this.error = "Cannot Delete. Internal server error";
            });
        }
      });
      
    }
    
} 
