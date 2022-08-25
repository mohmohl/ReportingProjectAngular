import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicDetail } from 'src/models/question_form/TopicDetail';
import { QuestionFormService } from 'src/services/QuestionFormService';

@Component({
  selector: 'app-question-form-result',
  templateUrl: './question-form-result.component.html',
  styleUrls: ['./question-form-result.component.css']
})
export class QuestionFormResultComponent implements OnInit {
  topic: TopicDetail;
  
  constructor(private router: Router, private activeRoute: ActivatedRoute, private questionFormServie: QuestionFormService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      if (params && params['param1']) {
        this.questionFormServie.checkCandidateAnswersByTopicAndCandidate(params['param1']).subscribe((res) => {
          this.topic = res;
          debugger;
          console.log(JSON.stringify(res));
        });
      }
    });
  }

  onBack() {
      this.router.navigate(["/question-form-list"]);
  }

}
