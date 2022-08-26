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

  constructor(private questionFormService: QuestionFormService, private router: Router) {

  }

  ngOnInit() {
    //let login_user: User = JSON.parse(localStorage.getItem('currentUser'));

    this.questionFormService.getQuestionForms().subscribe((res) => {
      this.topics = res;
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
