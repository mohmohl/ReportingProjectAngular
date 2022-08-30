import { Router } from '@angular/router';
import { CandidateTopic } from './../../../../models/question_form/CandidiateTopic';
import { Component, OnInit } from '@angular/core';
import { QuestionFormService } from 'src/services/QuestionFormService';

@Component({
  selector: 'app-question-form-list',
  templateUrl: './question-form-list.component.html',
  styleUrls: ['./question-form-list.component.css']
})
export class QuestionFormListComponent implements OnInit {

  topics: CandidateTopic[] = [];
  loading: boolean = false;

  constructor(private questionFormService: QuestionFormService, private router: Router) {

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
      this.router.navigate(['/question-form-submit', topic.id]);
    }

  }
}
