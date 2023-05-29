import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MFIUReportDto } from 'src/models/MFIUReportDto';
import { MFIUResponseDto } from 'src/models/MFIUResponse';
import { MFIUSetupDTO } from 'src/models/MFIUSetupDTO';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { MFIUService } from 'src/services/MFIUService';

@Component({
  selector: 'app-mfiu-setup',
  templateUrl: './mfiu-setup.component.html',
  styleUrls: ['./mfiu-setup.component.css']
})
export class MfiuSetupComponent implements OnInit {
  error='';
  message='';
  loading = false;
  _branchList;
  form = this.fb.group({
    branch_code:new FormControl('', Validators.required),
    serial_no:new FormControl('', Validators.required),
    entity_code:new FormControl('', Validators.required),
  });
  listData:MFIUSetupDTO[];
  constructor(private fb:FormBuilder,private service: LatestTrialReportService,private mfiu_service:MFIUService) { }

  ngOnInit() {
    this.loading = true;
    this.mfiu_service.getBranchList().subscribe((res:string[])=>{
      this.loading = false;
       this._branchList = res;
  },error => {
    this.loading = false;
    this.error ="Syatem have the error!...";
  });
    
    this.get_mfiu_setup_data();
  }
get_mfiu_setup_data(){
  this.listData=[];
  this.loading = true;
  this.mfiu_service.getMFIU_setup_list().subscribe((res:MFIUSetupDTO[])=>{
    this.loading = false;
     this.listData = res;
},error =>{
  this.loading = false;
  this.error ="Syatem have the error!...";
});
}

form_info_reset(){
  this.form.reset();
}


  call_edit_form(serial_no:string,entity_code:string,ac_branch:string){
    this.form = this.fb.group({
      branch_code:new FormControl(ac_branch, Validators.required),
      serial_no:new FormControl(serial_no, Validators.required),
      entity_code:new FormControl(entity_code, Validators.required),
    });
  }

submit(){

  this.message='';
  this.error='';
  if (this.form.invalid) {
    this.error = "Data is required";
    return;
  }
  let data=new MFIUSetupDTO;
  data.ac_branch=this.form.get(["branch_code"])!.value;
  data.serial_no=this.form.get(["serial_no"])!.value;
  data.reporting_entity_code=this.form.get(["entity_code"])!.value;
  this.loading = true;
  this.mfiu_service.save_mfiu_setup(data).subscribe((res:MFIUResponseDto)=>{
    this.loading = false;
     if(res.flag){
      this.message=res.message;
     }
     else{
      this.error=res.message;
     }
     this.get_mfiu_setup_data();
     this.form_info_reset();
},error =>{
  this.loading = false;
  this.error ="Syatem have the error!...";
});
}


}
