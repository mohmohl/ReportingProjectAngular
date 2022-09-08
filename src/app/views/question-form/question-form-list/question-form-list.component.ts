import { Router } from '@angular/router';
import { CandidateTopic } from './../../../../models/question_form/CandidiateTopic';
import { Component, OnInit } from '@angular/core';
import { QuestionFormService } from 'src/services/QuestionFormService';
import { QNAAnswerLogService } from 'src/services/qnaanswer-log.service';
import { AnswerLog } from 'src/models/question_form/AnswerLog';

@Component({
  selector: 'app-question-form-list',
  templateUrl: './question-form-list.component.html',
  styleUrls: ['./question-form-list.component.css']
})
export class QuestionFormListComponent implements OnInit {

  topics: CandidateTopic[] = [];
  loading: boolean = false;

  constructor(private questionFormService: QuestionFormService, private router: Router,
    private qNAAnswerLogService: QNAAnswerLogService) {

  }

  ngOnInit() {
    this.loading = true;
    this.questionFormService.getQuestionForms().subscribe((res) => {
      this.topics = res;
    }, (err => { }), () => {
      this.loading = false;
    });
  }

  goNextPage(topic: CandidateTopic) {
    if (topic.submitted) {
      this.router.navigate(['/question-form-result', topic.id]);
    }
    else {
      this.qNAAnswerLogService.getCandidateAnswerLog(topic.id).subscribe((answerLog: AnswerLog) => {
        if (answerLog != null && answerLog.try_count >= 3) {
          alert('မေးခွန်းအား (၃)ကြိမ် ကျော်လွန်၍ ဝင်ရောက်ပြီးပါသဖြင့် ဖြေဆိုခွင့်မရှိတော့ပါ။');
        }
        else {
          this.router.navigate(['/question-form-submit', topic.id]);
        }
      });
    }
  }
}
