import { environment } from './../../../../environments/environment.prod';
import { DialogService } from './../../../../helpers/dialog.service';
import { QuestionFormService } from 'src/services/QuestionFormService';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Option } from 'src/models/question_form/Option';
import { Question } from 'src/models/question_form/Question';
import { TopicDetail } from 'src/models/question_form/TopicDetail';
import { User } from 'src/models/User';
import { QNAAnswerLogService } from 'src/services/qnaanswer-log.service';
import { AnswerLog } from 'src/models/question_form/AnswerLog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-form-submit',
  templateUrl: './question-form-submit.component.html',
  styleUrls: ['./question-form-submit.component.css']
})
export class QuestionFormSubmitComponent implements OnInit {

  topic_id: string;
  topic: TopicDetail;
  remaningQuestions: Question[] = [];
  remainWarningMsg = 'ဖြေဆိုရန် ကျန်ရှိနေပါသည်';
  isSubmitted = false;
  loading = false;
  answerCount = 0;
  totalCount = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private questionFormServie: QuestionFormService,
    private dialogService: DialogService,
    private qNAAnswerLogService: QNAAnswerLogService) { }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isSubmitted) {
      return this.dialogService.confirm('မေးခွန်းများအားလုံး ဖြေဆိုရန်လိုအပ်ပါသည်။ မဖြေဆိုပဲ OK အားနှိပ်၍ EXAM ROOM မှထွက်ပါက ဖြေဆိုခွင့် (၁) ကြိမ်ဆုံးရှုံးမည်ဖြစ်သည်။');
    }
    return true;
  }

  ngOnInit() {

    this.activeRoute.params.subscribe((params) => {
      if (params && params['param1']) {
        let topicId = params['param1'];

        this.loading = true;

        this.qNAAnswerLogService.getCandidateAnswerLog(topicId).subscribe((answerLog: AnswerLog) => {
          if (answerLog != null && answerLog.try_count >= 3) {
            this.isSubmitted = true;
            this.router.navigate(['/question-form-list']);
          }
          this.questionFormServie.getQuestionFormByID(topicId).subscribe((res) => {
            this.qNAAnswerLogService.updateCandidateAnswerLog(topicId).subscribe((updateRes) => {
              this.topic = res;
              this.topic_id = this.topic.id;

              this.totalCount = this.topic.questions.length;
            }, error => {
              this.isSubmitted = true;
              this.router.navigate(['/question-form-list']);
            }, () => {
              this.loading = false;
            });
          }, error => {
            this.isSubmitted = true;
            this.router.navigate(['/question-form-list']);
          }, () => {
            this.loading = false;
          });
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

    console.log(this.topic);

    let unAnswers = this.topic.questions.filter(q => q.options.every(op => op.is_chosen == 0) == true);
    this.answerCount = this.totalCount - unAnswers.length
  }

  onSubmit() {
    this.qNAAnswerLogService.getCandidateAnswerLog(this.topic.id).subscribe((answerLog: AnswerLog) => {

      if (answerLog != null && answerLog.try_count >= 3) {
        this.isSubmitted = true;
        this.router.navigate(['/question-form-list']);
      } else {
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
          if (confirm('ဖြေဆိုရန် မေးခွန်း ကျန်ရှိနေပါသည်။ မဖြေဆိုပဲ အဖြေလွှာအား အပ်လိုပါသလား') == true) {
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
    });
  }

  onBack() {
    this.router.navigate(["/question-form-list"]);
  }
}
