import { Topic } from './../../../../models/question_form/Topic';
import { Component, OnInit } from '@angular/core';
import SampleJson from '../../../../assets/maker_topics.json'

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topics: Topic[] = [];

  constructor() { }

  ngOnInit() {
    this.topics = JSON.parse(JSON.stringify(SampleJson));
  }

}
