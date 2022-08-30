import { QuestionFormService } from 'src/services/QuestionFormService';
import { Topic } from './../../../../models/question_form/Topic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  message: String = "";
  topics: Topic[] = [];

  constructor(private questionFormService: QuestionFormService) { }

  ngOnInit() {
    this.fetchTopicList();
  }

  fetchTopicList() {
    this.questionFormService.getTopics().subscribe((res) => {
      this.topics = res;
    });
  }

  changeActiveStatus(id: number) {
    this.questionFormService.isTopicRemovable(id).subscribe((res: Boolean) => {
      if (res === false) {
        let confirm = window.confirm('Are you sure to remove topic?');
        if (confirm) {
          this.questionFormService.deleteTopic(id).subscribe((deleteResult) => {
            this.fetchTopicList();
          });
        }
      } else {
          this.questionFormService.deleteTopic(id).subscribe((deleteResult) => {
            this.fetchTopicList();
          }, error => {
            this.message = "Failed to delete!";      
          });
      }
    }, (error) => {
        this.message = "Failed to delete!";
    });
 
}

}
