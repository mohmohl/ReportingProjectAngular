import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MABAnswer } from 'src/models/mabAnswer';
import { MABQuestion } from 'src/models/MABQuestion';
import { MABAnsweringObj } from 'src/models/MABAnsweringObj';
import { QAService } from 'src/services/QAService';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-mab-question-answer',
  templateUrl: './mab-question-answer.component.html',
  styleUrls: ['./mab-question-answer.component.scss']
})
export class MABQuestionAnswerComponent implements OnInit {
  loading=false;
  error="";
  disable_flag=false;
  survey_title='';
  dueDateMessage='';
  question : MABQuestion[] = null;
  quesform= this.fb.group({
    answerList: []
  });
  pipe = new DatePipe('en-US');
  constructor(private fb:FormBuilder,private service:QAService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getQuestionList().subscribe((res: MABQuestion[]) => {
      this.loading = false;
      if(res){
      this.question = res;
      let current_date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
      let d1 = new Date(this.question[0].due_dt);
      let d2 = new Date(current_date);
      
      if(d1 < d2){
        this.disable_flag=true;
      }
      this.survey_title=this.question[0].title;
      this.dueDateMessage = "Due Date is "+this.pipe.transform(this.question[0].due_dt, 'yyyy-MM-dd');
      this.quesform=this.fb.group({
        answerList: this.setAnswerList(this.question)
      });
    }
    else{
      this.error ="Does not exist Survey!....."
    }
    },
    error => {
      this.error ="The system have the error";
      this.loading = false;
    });
  }
  setAnswerList(list:MABQuestion[]) : FormArray{
    const arr = this.fb.array([]);
    list.forEach(e =>{ 
        arr.push(
          this.fb.group({
            qus_id:e.ques_id,
            ans:new FormControl({value:'',disabled: this.disable_flag},Validators.required,),
          })
        );
    });
    return arr;
  }

  sendAnswer(){
    this.error='';
    if (this.quesform.invalid) {
      this.error = "Please Fill Answer!....";
      return;
  }
  this.loading = true;
    const ans_data:MABAnswer[] =this.getFormAnsList();
    const obj: MABAnsweringObj={
      answer_list: ans_data
    };

this.service.requestToAnswer(obj).subscribe((res:{status,message})=>{
  this.loading = false;
  
 if(res){
  this.error=res.message;

 }
     
  
},(error) => {
  
  this.loading = false;
  this.error="Internal Server Error";
  console.log(error);
});
  }
    
    getFormAnsList():MABAnswer[]{
      const ansList:MABAnswer[]=[];
      for(const field of this.quesform!.get('answerList')!.value){
        const f : MABAnswer={
          ans_id: '',
          ques_id: field.qus_id,
          answer: field.ans,
          description: '',
          question: '',
          ques_no: ''
        };
        ansList.push(f);
      }
      return ansList;
    }

}
