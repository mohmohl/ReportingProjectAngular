import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MFIUResponseDto } from 'src/models/MFIUResponse';
import { MFIUSetupDTO } from 'src/models/MFIUSetupDTO';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { MFIUService } from 'src/services/MFIUService';

@Component({
  selector: 'app-mfiu-email-template',
  templateUrl: './mfiu-email-template.component.html',
  styleUrls: ['./mfiu-email-template.component.css']
})
export class MfiuEmailTemplateComponent implements OnInit {

  error='';
  message='';
  loading = false;
  form = this.fb.group({
    to_email:new FormControl('', Validators.required),
    cc_email:new FormControl('', Validators.required),
    bcc_email:new FormControl('', Validators.required),
    subject:new FormControl('', Validators.required),
    body:new FormControl('', Validators.required),
  });
  constructor(private fb:FormBuilder,private service: LatestTrialReportService,private mfiu_service:MFIUService) { }

  ngOnInit() {
    this.loading = true;
    this.get_mfiu_email_template_data();
    
  }
  get_mfiu_email_template_data(){
 
    this.loading = true;
    this.mfiu_service.get_mfiu_email_template().subscribe((res:MFIUSetupDTO)=>{
      this.loading = false;
      this.form = this.fb.group({
        to_email:new FormControl(res.to_email, Validators.required),
        cc_email:new FormControl(res.cc_email, Validators.required),
        bcc_email:new FormControl(res.bcc_email, Validators.required),
        subject:new FormControl(res.email_subj, Validators.required),
        body:new FormControl(res.email_body, Validators.required),
      });
  },error =>{
    this.loading = false;
    this.error ="Syatem have the error!...";
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
    data.to_email=this.form.get(["to_email"])!.value;
    data.cc_email=this.form.get(["cc_email"])!.value;
    data.bcc_email=this.form.get(["bcc_email"])!.value;
    data.email_subj=this.form.get(["subject"])!.value;
    data.email_body=this.form.get(["body"])!.value;
    this.loading = true;
    this.mfiu_service.save_mfiu_email_template(data).subscribe((res:MFIUResponseDto)=>{
      this.loading = false;
       if(res.flag){
        this.message=res.message;
       }
       else{
        this.error=res.message;
       }
       this.get_mfiu_email_template_data();
 
  },error =>{
    this.loading = false;
    this.error ="Syatem have the error!...";
  });
  }

}
