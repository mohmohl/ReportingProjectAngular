import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PONumberObj } from 'src/models/PONumberObj';
import { BackDateReportService } from 'src/services/BackDateReportService';
import { CommomBranchService } from 'src/services/CommonBranchServcie';

@Component({
  selector: 'app-po-invoice',
  templateUrl: './po-invoice-record.component.html',
  styleUrls: ['./po-invoice-record.component.css']
})
export class PoInvoiceComponent implements OnInit {
  error='';
  successMsg='';
  loading = false;
  home_branch:string='';
po_obj:PONumberObj;
  form = this.fb.group({
    po_no:new FormControl('', Validators.required),
    branch_code:new FormControl('', Validators.required),
    amount:new FormControl('', Validators.required),
    status:new FormControl("I", Validators.required)
  });
  constructor(private fb:FormBuilder,private bdService:BackDateReportService,private b_service:CommomBranchService) { 
    this.error="";
    this.b_service.get_home_branch().subscribe(res =>{
      this.loading = false
     // this.home_branch=res;
      this.home_branch='002';
    },error=>{
      this.loading = false
      this.error="System have the error!..."
    });


  }

  
  ngOnInit() {
  }

  searchPORecord(){
    this.error="";
    this.successMsg="";
    this.loading =true;
    this.bdService.get_po_data(this.form.get(["po_no"])!.value).subscribe((res:PONumberObj)=>{
      this.loading = false;
      if(res){
      this.form=new FormGroup({
        po_no:new FormControl(res.po_no, Validators.required),
    branch_code:new FormControl(res.branch_code, Validators.required),
    amount:new FormControl(res.amount, Validators.required),
    status:new FormControl(res.status, Validators.required)
      });
    }
    else{
      this.form=new FormGroup({
        po_no:new FormControl(this.form.get(["po_no"])!.value, Validators.required),
    branch_code:new FormControl(this.home_branch, Validators.required),
    amount:new FormControl('', Validators.required),
    status:new FormControl('I', Validators.required)
    });
  }
    },error=>{
      this.loading = false;
      this.error="System have the error!...."
    }
    );
  }
  submit(po:PONumberObj){
    this.error="";
    this.successMsg="";
    if (this.form.invalid) {
      this.form.getError
      this.error = "Data is required !....";
      return;
  }


  this.bdService.save_updae_po_number(po).subscribe(res =>{
    this.loading = false
if(res){
  this.successMsg="Data is successful saved!....";
  this.form=new FormGroup({
    po_no:new FormControl('', Validators.required),
branch_code:new FormControl(this.home_branch, Validators.required),
amount:new FormControl('', Validators.required),
status:new FormControl('I', Validators.required)
  });
}
else{
  this.error="Cannot Save data!....";
}
  },error=>{
    this.loading = false
    this.error="System have the error!..."
  });
}
  

  
    

  
  //end
}



