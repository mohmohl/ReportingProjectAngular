import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MFIUResponseDto } from 'src/models/MFIUResponse';
import { MFIUSetupDTO } from 'src/models/MFIUSetupDTO';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { MFIUService } from 'src/services/MFIUService';

@Component({
  selector: 'app-mfiu-branch-email-setup',
  templateUrl: './mfiu-branch-email-setup.component.html',
  styleUrls: ['./mfiu-branch-email-setup.component.css']
})
export class MfiuBranchEmailSetupComponent implements OnInit {
  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    // toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Arial',
    defaultFontSize: '3',
    // showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['insertImage','insertVideo'],
      ['fontSize']
    ]
  };
  
  error='';
  message='';
  loading = false;
  _branchList;
  form = this.fb.group({
    branch_code:new FormControl('', Validators.required),
    //from_email:new FormControl('', Validators.required),
    //email_pwd:new FormControl('', Validators.required),
    phone_no:new FormControl('', Validators.required),
    officer_name:new FormControl('', Validators.required),
    officer_title:new FormControl('', Validators.required),
    email_signature:new FormControl('', Validators.required),
  });
  constructor(private fb:FormBuilder,private service: LatestTrialReportService,private mfiu_service:MFIUService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getBranchList(1).subscribe((res:string[])=>{
        this.loading = false;
         this._branchList = res;
         if(this._branchList.length>0)
         this.get_mfiu_email_setup_data(this._branchList[0]);
    },error =>{
      this.loading = false;
      this.error ="Syatem have the error!...";
    });
  }
  get_mfiu_email_setup_data(branch:string){
 
    this.loading = true;
    this.mfiu_service.get_email_setup(branch).subscribe((res:MFIUSetupDTO)=>{
      this.loading = false;
      this.form = this.fb.group({
        branch_code:new FormControl(res.ac_branch, Validators.required),
        //from_email:new FormControl(res.from_email, Validators.required),
       // email_pwd:new FormControl(res.email_pwd, Validators.required),
        phone_no:new FormControl(res.phone_no, Validators.required),
        officer_name:new FormControl(res.name, Validators.required),
        officer_title:new FormControl(res.title, Validators.required),
        email_signature:new FormControl(res.email_signature, Validators.required),
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
    data.ac_branch=this.form.get(["branch_code"])!.value;
    //data.from_email=this.form.get(["from_email"])!.value;
    //data.email_pwd=this.form.get(["email_pwd"])!.value;
    data.phone_no=this.form.get(["phone_no"])!.value;
    data.name=this.form.get(["officer_name"])!.value;
    data.title=this.form.get(["officer_title"])!.value;
    data.email_signature=this.form.get(["email_signature"])!.value;
    this.loading = true;
    this.mfiu_service.save_mfiu_email_record(data).subscribe((res:MFIUResponseDto)=>{
      this.loading = false;
       if(res.flag){
        this.message=res.message;
       }
       else{
        this.error=res.message;
       }
       this.get_mfiu_email_setup_data(data.ac_branch);
 
  },error =>{
    this.loading = false;
    this.error ="Syatem have the error!...";
  });
  }


}
