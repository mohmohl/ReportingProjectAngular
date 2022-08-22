import { MakerTopic } from './../../../../models/question_form/MakerTopic';
import { Component, OnInit } from '@angular/core';
import SampleJson from '../../../../assets/maker_topics.json'

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topics: MakerTopic[] = [];

  constructor() { }

  ngOnInit() {
    this.topics = JSON.parse(JSON.stringify(SampleJson));
  }

}
