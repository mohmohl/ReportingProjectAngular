import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MABAnswer } from 'src/models/MABAnswer';
import { QAService } from 'src/services/QAService';

@Component({
  selector: 'app-mab-answer-view',
  templateUrl: './mab-answer-view.component.html',
  styleUrls: ['./mab-answer-view.component.scss']
})
export class MABAnswerViewComponent implements OnInit {
  loading=false;
  error="";
  branch:string;
  userId:string;
  branch_list:string[];
  sno_list:string[];
  response:MABAnswer[];
  form = new FormGroup({
    branch_code: new FormControl('All',Validators.required),
    SNO: new FormControl('',Validators.required)
  });
  constructor(private service:QAService) { }

  ngOnInit() {
    this.service.getBranchDataList().subscribe((res: string[]) => {
      this.loading = false;
      this.branch_list = res;
    },
    error => {
      this.error ="The system have the error";
      this.loading = false;
    });
  }
branchOnChange(event:any){
  this.loading = true;
  var value = event.target.value;
  alert(value)
  this.service.getAnsweredUserDataList(value).subscribe((res: string[]) => {
    this.loading = false;
    this.sno_list = res;
  },
  error => {
    this.error ="The system have the error";
    this.loading = false;
  });
  
}
  search(formdata){
    this.error ='';
    this.response = null;
    if (this.form.invalid) {
      this.error = "Please Fill required field!....";
      return;
  }
    
    this.loading = true;

    this.branch = formdata.branch_code;
    this.userId = formdata.SNO;

    this.service.getAnswerListByUser(this.branch,this.userId).subscribe((res: MABAnswer[]) => {
      this.loading = false;
      this.response = res;
    },
    error => {
      this.error ="The system have the error";
      this.loading = false;
    });
  }

}
