import { DialogService } from './../../../../helpers/dialog.service';
import { QuestionFormService } from 'src/services/QuestionFormService';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Option } from 'src/models/question_form/Option';
import { Question } from 'src/models/question_form/Question';
import { TopicDetail } from 'src/models/question_form/TopicDetail';
import { User } from 'src/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-form-submit',
  templateUrl: './question-form-submit.component.html',
  styleUrls: ['./question-form-submit.component.css']
})
export class QuestionFormSubmitComponent implements OnInit {

  topic: TopicDetail;
  remaningQuestions: Question[] = [];
  remainWarningMsg = 'No answer is choosen';
  isSubmitted = false;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private questionFormServie: QuestionFormService,
    private dialogService: DialogService) { }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isSubmitted) {
      return this.dialogService.confirm('Your data will be lost. Are you sure to leave this page?');
    }
    return true;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      if (params && params['param1']) {
        this.questionFormServie.getQuestionFormByID(params['param1']).subscribe((res) => {
          this.topic = res;
          console.log(JSON.stringify(res));
        });
      }
    });
  }

  onChange(question: Question, option: Option) {
    if (question.type.type == 'checkbox') {
      option.is_chosen = option.is_chosen == 0 ? 1 : 0;
    }
    else if (question.type.type == 'radio') {
      for (let opt of question.options) {
        if (opt.id == option.id) {
          opt.is_chosen = 1;
        }
        else {
          opt.is_chosen = 0;
        }
      }
    }
  }

  onSubmit() {
    this.remaningQuestions = this.topic.questions.filter(q => q.options.every(op => op.is_chosen == 0) == true);

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
        this.questionFormServie.submitQuestion(this.topic).subscribe((res) => {
          this.isSubmitted = true;
          this.router.navigate(['/question-form-list']);
        });
      }
    }
    else {
      this.questionFormServie.submitQuestion(this.topic).subscribe((res) => {
        this.isSubmitted = true;
        this.router.navigate(['/question-form-list']);
      });
    }
  }

  onBack() {
    this.router.navigate(["/question-form-list"]);
  }
}
