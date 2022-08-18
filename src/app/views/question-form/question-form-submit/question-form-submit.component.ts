import { Component, OnInit } from '@angular/core';
import { Option } from 'src/models/question_form/Option';
import { Question } from 'src/models/question_form/Question';
import { Topic } from 'src/models/question_form/Topic';
import { User } from 'src/models/User';
import SampleJson from '../../../../assets/question_form.json';

@Component({
  selector: 'app-question-form-submit',
  templateUrl: './question-form-submit.component.html',
  styleUrls: ['./question-form-submit.component.css']
})
export class QuestionFormSubmitComponent implements OnInit {

  topic: Topic;
  remaningQuestions: Question[] = [];
  remainWarningMsg = 'No answer is choosen';

  constructor() { }

  ngOnInit() {
    this.topic = JSON.parse(JSON.stringify(SampleJson));
  }

  onChange(question: Question, option: Option) {
    if (question.type == 'checkbox') {
      option.user_chosen = option.user_chosen == "0" ? "1" : "0";
    }
    else if (question.type == 'radio') {
      for (let opt of question.options) {
        if (opt.id == option.id) {
          opt.user_chosen = "1";
        }
        else {
          opt.user_chosen = "0";
        }
      }
    }
  }

  onSubmit() {
    this.remaningQuestions = this.topic.questions.filter(q => q.options.every(op => op.user_chosen == '0') == true);

    // this.remaningQuestions = this.topic.questions.filter(q => {
    //   let total = q.options.reduce((sum, current) => {
    //     if (current.user_chosen === '0')
    //       return sum;
    //     else
    //       return ++sum;
    //   }, 0);
    //   return total == 0;
    // })

    let login_user: User = JSON.parse(localStorage.getItem('currentUser'));
    this.topic.user_id = login_user.userId;

    if (this.remaningQuestions && this.remaningQuestions.length > 0) {
      if (confirm("You have not choosen one or more questions. Do you want to submit?") == true) {
        console.log(JSON.stringify(this.topic));
      }
    }
    else {
      console.log(JSON.stringify(this.topic));
    }
  }
}
