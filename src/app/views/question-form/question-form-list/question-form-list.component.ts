import { CandidateTopic } from './../../../../models/question_form/CandidiateTopic';
import { Component, OnInit } from '@angular/core';
import { QuestionFormService } from 'src/services/QuestionFormService';
import { User } from 'src/models/User';

@Component({
  selector: 'app-question-form-list',
  templateUrl: './question-form-list.component.html',
  styleUrls: ['./question-form-list.component.css']
})
export class QuestionFormListComponent implements OnInit {

  topics: CandidateTopic[] = [];

  constructor(private questionFormService: QuestionFormService) {

  }

  ngOnInit() {
    //let login_user: User = JSON.parse(localStorage.getItem('currentUser'));

    this.questionFormService.getQuestionForms().subscribe((res) => {
      this.topics = res;
    });
  }
}
