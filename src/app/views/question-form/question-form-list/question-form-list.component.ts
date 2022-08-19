import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/models/question_form/Topic';
import SampleJson from '../../../../assets/topics.json';

@Component({
  selector: 'app-question-form-list',
  templateUrl: './question-form-list.component.html',
  styleUrls: ['./question-form-list.component.css']
})
export class QuestionFormListComponent implements OnInit {

  topics: Topic[] = [];

  constructor() { }

  ngOnInit() {
    this.topics = JSON.parse(JSON.stringify(SampleJson));
  }
}
