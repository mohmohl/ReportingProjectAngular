import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { map } from 'rxjs/operators';
import { MABSurvey } from 'src/models/MABSurvey';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { QAService } from 'src/services/QAService';
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
  selector: 'app-mab-survey-setting',
  templateUrl: './mab-survey-setting.component.html',
  styleUrls: ['./mab-survey-setting.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class MabSurveySettingComponent implements OnInit {
  loading=false;
  error="";
  survey_list: MABSurvey[];
  form = new FormGroup({
    survey_id:new FormControl(''),
    title: new FormControl('',Validators.required),
    status:new FormControl('',Validators.required),
    due_dt: new FormControl(new Date,Validators.required)
  });
  constructor(private service:QAService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getSurveyDataList().subscribe((res: MABSurvey[]) => {
      this.loading = false;
      this.survey_list = res;
    },
    error => {
      this.error ="The system have the error";
      this.loading = false;
    });
  }
  edit_survey(survey_id,title,status,due_dt){
    this.form=new FormGroup({
    survey_id:new FormControl(survey_id),
    title: new FormControl(title,Validators.required),
    status:new FormControl(status,Validators.required),
    due_dt: new FormControl(new Date(due_dt),Validators.required)
    });
    }
  save_survey(formdata){
      this.error='';
      if (this.form.invalid) {
        this.error = "Please Fill required field!....";
        return;
    }
    let d_date = `${formdata.due_dt.getFullYear()}-${formdata.due_dt.getMonth()+1}-${formdata.due_dt.getDate()}`;
     
    const q : MABSurvey={
      survey_id:formdata.survey_id,
	    title:formdata.title,
      survey_desc:'',
      status:formdata.status,
      due_dt:new Date(d_date)
    };
      this.loading = true;
      this.service.saveToSurvey(q).pipe(
        map((data: any) => {
          this.loading = false;
          console.log("response = "+data);
         // console.log("getMemberList: ",res.json());
            this.error =data;
            this.form = new FormGroup({
              survey_id:new FormControl(''),
              title: new FormControl('',Validators.required),
              status:new FormControl('',Validators.required),
              due_dt: new FormControl(new Date,Validators.required)
            });
            this.loading = true;
            this.service.getSurveyDataList().subscribe((res: MABSurvey[]) => {
              this.loading = false;
              this.survey_list = res;
            },
            error => {
              this.error ="The system have the error";
              this.loading = false;
            });
        }))
      .subscribe(res => {
       
      },
      error => {
        console.log("error response = "+error);
        this.error ="The system have the error aa";
        this.loading = false;
      });
}
}
