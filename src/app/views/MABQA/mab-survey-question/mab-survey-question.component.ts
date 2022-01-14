import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MABQuestion } from 'src/models/MABQuestion';
import { MABSurvey } from 'src/models/MABSurvey';
import { QAService } from 'src/services/QAService';

@Component({
  selector: 'app-mab-survey-question',
  templateUrl: './mab-survey-question.component.html',
  styleUrls: ['./mab-survey-question.component.css']
})
export class MabSurveyQuestionComponent implements OnInit {
  loading=false;
  error="";
  search_error="";
  survey_title = "";
  survey_list:MABSurvey[];
  ques_list:MABQuestion[];
  form = new FormGroup({
    ques_id:new FormControl(''),
    survey_id: new FormControl('',Validators.required),
    question: new FormControl('',Validators.required),
    ques_no: new FormControl('',Validators.required),
    question_type: new FormControl('I',Validators.required)
  });
  search_form = new FormGroup({
    survey_id: new FormControl('0',Validators.required)
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

  save_question(formdata){
    debugger
    this.error='';
    if (this.form.invalid) {
      this.error = "Please Fill required field!....";
      return;
  }
  const q : MABQuestion={
    ques_id: formdata.ques_id,
    survey_id: formdata.survey_id,
    ques_no: formdata.ques_no,
    question: formdata.question,
    remark: '',
    question_type: formdata.question_type,
    title: '',
    due_dt: undefined
  };
    this.loading = true;
    this.service.saveToQuestion(q).subscribe((res: boolean) => {
      this.loading = false;
      console.log("response = "+res);
      if(res){
        this.error ="Question save Successful!...";
        this.form = new FormGroup({
          ques_id:new FormControl(''),
          survey_id: new FormControl('',Validators.required),
          question: new FormControl('',Validators.required),
          ques_no: new FormControl('',Validators.required),
          question_type: new FormControl('I',Validators.required)
        });
      }
      else{
        this.error ="Question cannot save!...";
      }
    },
    error => {
      this.error ="The system have the error";
      this.loading = false;
    });
  }


search_question(formdata){
 
    this.search_error ='';
    this.ques_list = null;
    if (this.search_form.invalid) {
      this.search_error = "Please Fill required field!....";
      return;
  }
    
    this.loading = true;
    this.service.getQuestionBySurveyId(formdata.survey_id).subscribe((res: MABQuestion[]) => {
      this.loading = false;
      this.ques_list = res;
    },
    error => {
      this.search_error ="The system have the error";
      this.loading = false;
    });
}
edit_question(id,survey_id,ques_no,question,question_type){
this.form=new FormGroup({
  ques_id:new FormControl(id),
  survey_id: new FormControl(survey_id,Validators.required),
  question: new FormControl(question,Validators.required),
  ques_no: new FormControl(ques_no,Validators.required),
  question_type: new FormControl(question_type,Validators.required)
});
}

}
