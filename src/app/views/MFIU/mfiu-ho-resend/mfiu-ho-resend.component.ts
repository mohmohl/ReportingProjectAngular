import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonUtil } from 'src/app/shared/common-util';
import { MFIUReportDto } from 'src/models/MFIUReportDto';
import { MFIUResponseDto } from 'src/models/MFIUResponse';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { MFIUService } from 'src/services/MFIUService';
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
  selector: 'app-mfiu-ho-resend',
  templateUrl: './mfiu-ho-resend.component.html',
  styleUrls: ['./mfiu-ho-resend.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class MfiuHoResendComponent implements OnInit {

  error='';
  message='';
  loading = false;
  branch_code='';
  fromDate='';
  toDate='';
  _branchList;
  send_btn_flag=true;
  search_btn_flag=false;
  closeResult: string;
  form = this.fb.group({
    branch_code:new FormControl('', Validators.required),
    from_date:new FormControl('', Validators.required),
    to_date:new FormControl('', Validators.required),
  });
  listData:MFIUReportDto[];

  editform = this.fb.group({
    ac_entry_sr_no:new FormControl('', Validators.required),
    com_reg_no:new FormControl(''),
    gender:new FormControl(''),
    ph_no:new FormControl(''),
    address:new FormControl(''),
    inten_txn:new FormControl(''),
    ac_branch:new FormControl('')
  });
  constructor(private _util: CommonUtil,private fb:FormBuilder,private service: LatestTrialReportService,private mfiu_service:MFIUService,private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = true;
        this.service.getBranchList(1).subscribe((res:string[])=>{
            this.loading = false;
             this._branchList = res;
        });
  }
  submit(){
    this.error ='';
    this.message='';
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
    this.branch_code=this.form.get(["branch_code"])!.value;
    this.fromDate = this._util.getDDMMMYYYY(this.form.get(["from_date"])!.value);
    this.toDate = this._util.getDDMMMYYYY(this.form.get(["to_date"])!.value);
    this.search_mfiu_data(this.fromDate,this.toDate,this.branch_code,3,4);

  }
search_mfiu_data(from:string,to:string,branch:string,status:number,resendStatus:number){
  this.loading = true;
  this.search_btn_flag=true;
  this.send_btn_flag=true;
  this.listData =[];
      this.mfiu_service.getMFIUHORecord(from,to,branch,status,resendStatus).subscribe((res:MFIUResponseDto)=>{
          this.loading = false;
          this.search_btn_flag=false;
          this.listData = res.data_list;
          if(res.flag){
            if(this.listData.length>0){
              this.send_btn_flag=false;
            }
            else{
              this.send_btn_flag=true;
            }
          }
          else{
            this.send_btn_flag=true;
          }
          
      },
      error => {
        this.loading = false;
        this.error ="Syatem have the error!...";
      });
}
  call_edit_modal(content,inten_of_txn:string,com_reg_no:string,gender:string,phone_no:string,address:string,ac_entry_sr_no:string,branch:string){

    this.editform=this.fb.group({
      ac_entry_sr_no:new FormControl(ac_entry_sr_no, Validators.required),
      com_reg_no:new FormControl(com_reg_no),
      gender:new FormControl(gender),
      ph_no:new FormControl(phone_no),
      address:new FormControl(address),
      inten_txn:new FormControl(inten_of_txn),
      ac_branch:new FormControl(branch)
    });
  
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  cancel(): void {
    this.closeResult = `Dismissed`;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`

    }
  }

  updateSubmit(){
    this.error ='';
    this.message='';
    this.modalService.dismissAll();
    if (this.editform.invalid) {
      this.error = "Data is required";
      return;
    }
    this.loading = true;
    var obj=new MFIUReportDto();
    obj.ac_entry_sr_no=this.editform.get(["ac_entry_sr_no"])!.value
    obj.company_reg_no=this.editform.get(["com_reg_no"])!.value
    obj.gender=this.editform.get(["gender"])!.value
    obj.phone_no=this.editform.get(["ph_no"])!.value
    obj.address=this.editform.get(["address"])!.value
    obj.narrative=this.editform.get(["inten_txn"])!.value
    this.mfiu_service.update_field_mfiu(obj).subscribe((res:MFIUResponseDto)=>{
      this.loading = false;
      if(res.flag){
        this.message=res.message;
      }
      else{
        this.error =res.message;
      }
      this.search_mfiu_data(this.fromDate,this.toDate,this.editform.get(["ac_branch"])!.value,3,4);
    },
      error => {
        this.loading = false;
        this.error ="Syatem have the error!...";
      });
  }

  send_to_CBM(){
    this.send_btn_flag=true;
    this.error ='';
    this.message='';
    this.loading = true;
    this.mfiu_service.send_mfiu(3,4,this.branch_code,this.fromDate,this.toDate).subscribe((res:MFIUResponseDto)=>{
      this.loading = false;
      if(res.flag){
        this.message=res.message;
      }
      else{
        this.error =res.message;
      }
   this.listData=[];
    },
      error => {
        this.loading = false;
        this.error ="Syatem have the error!...";
      });

  }
remove_record(event:any,status:number,ac_entry_sr_no:string){
  event.target.disabled = true;

  this.mfiu_service.updateMFIUByEntryNO(status,ac_entry_sr_no).subscribe((res:MFIUResponseDto)=>{
    this.loading = false;
    if(res.flag){
      this.message=res.message;
    }
    else{
      this.error =res.message;
    }
    this.search_mfiu_data(this.fromDate,this.toDate,this.branch_code,2,3);
  },
    error => {
      this.loading = false;
      this.error ="Syatem have the error!...";
    });

   
}
}
