import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MFIUReportDto } from 'src/models/MFIUReportDto';
import { MFIUResponseDto } from 'src/models/MFIUResponse';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { MFIUService } from 'src/services/MFIUService';

@Component({
  selector: 'app-mfiu-branch-report',
  templateUrl: './mfiu-branch-report.component.html',
  styleUrls: ['./mfiu-branch-report.component.css']
})
export class MfiuBranchReportComponent implements OnInit {
  error='';
  message='';
  loading = false;
  branch_code='';
  _branchList;
  send_btn_flag=true;
  search_btn_flag=false;
  closeResult: string;
  form = this.fb.group({
    branch_code:new FormControl('', Validators.required),
  });
  listData:MFIUReportDto[];

  editform = this.fb.group({
    ac_entry_sr_no:new FormControl('', Validators.required),
    com_reg_no:new FormControl(''),
    gender:new FormControl(''),
    ph_no:new FormControl(''),
    buildingno:new FormControl(''),
	  street:new FormControl(''),
	  city:new FormControl(''),
	  township:new FormControl(''),
	  country:new FormControl(''),
    //address:new FormControl(''),
    inten_txn:new FormControl(''),
    ac_branch:new FormControl('')
  });
  constructor(private fb:FormBuilder,private service: LatestTrialReportService,private mfiu_service:MFIUService,private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = true;
    this.mfiu_service.getBranchList().subscribe((res:string[])=>{
      this.loading = false;
       this._branchList = res;
  },error => {
    this.loading = false;
    this.error ="Syatem have the error!...";
  });
        /*this.service.getBranchList(1).subscribe((res:string[])=>{
            this.loading = false;
             this._branchList = res;
        });*/
  }
  submit(){
    this.error ='';
    this.message='';
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
    this.branch_code=this.form.get(["branch_code"])!.value;
    this.search_mfiu_data(this.branch_code);

  }
search_mfiu_data(branch:string){
  this.loading = true;
  this.search_btn_flag=true;
  this.send_btn_flag=true;
  this.listData =[];
      this.mfiu_service.getMFIUBranchRecord(branch).subscribe((res:MFIUResponseDto)=>{
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
          
      },error => {
        this.loading = false;
        this.error ="Syatem have the error!...";
      });
}
  call_edit_modal(content,inten_of_txn:string,com_reg_no:string,gender:string,phone_no:string,buildingno:string,street:string,city:string,township:string,country:string,ac_entry_sr_no:string,branch:string){

    this.editform=this.fb.group({
      ac_entry_sr_no:new FormControl(ac_entry_sr_no, Validators.required),
      com_reg_no:new FormControl(com_reg_no),
      gender:new FormControl(gender),
      ph_no:new FormControl(phone_no),
      buildingno:new FormControl(buildingno),
      street:new FormControl(street),
      city:new FormControl(city),
      township:new FormControl(township),
      country:new FormControl(country),
      //address:new FormControl(''),
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
    obj.buildingno=this.editform.get(["buildingno"])!.value
    obj.street=this.editform.get(["street"])!.value
    obj.city=this.editform.get(["city"])!.value
    obj.township=this.editform.get(["township"])!.value
    obj.country=this.editform.get(["country"])!.value
    obj.narrative=this.editform.get(["inten_txn"])!.value
    this.mfiu_service.update_field_mfiu(obj).subscribe((res:MFIUResponseDto)=>{
      this.loading = false;
      if(res.flag){
        this.message=res.message;
      }
      else{
        this.error =res.message;
      }
      this.search_mfiu_data(this.editform.get(["ac_branch"])!.value);
    },
      error => {
        this.loading = false;
        this.error ="Syatem have the error!...";
      });
  }

  send_to_HO(){
    this.send_btn_flag=true;
    this.error ='';
    this.message='';
    this.loading = true;
    this.mfiu_service.send_mfiu_record(1,2,this.branch_code).subscribe((res:MFIUResponseDto)=>{
      this.loading = false;
      if(res.flag){
        this.message=res.message;
      }
      else{
        this.error =res.message;
      }
     // this.search_mfiu_data(this.form.get(["ac_branch"])!.value);
    },
      error => {
        this.loading = false;
        this.error ="Syatem have the error!...";
      });

  }
}
