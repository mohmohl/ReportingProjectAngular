import { TopicDetail } from 'src/models/question_form/TopicDetail';
import { QuestionFormService } from './../../../../services/QuestionFormService';
import { Component, OnInit } from '@angular/core';
import { ReportRole } from 'src/models/ReportRole';
import { TopicRole } from 'src/models/question_form/TopicRole';

@Component({
  selector: 'app-topic-role',
  templateUrl: './topic-role.component.html',
  styleUrls: ['./topic-role.component.css']
})
export class TopicRoleComponent implements OnInit {

  roles: ReportRole[];
  topics: TopicRole[];
  selectedRole: String;
  loading: boolean = false;

  constructor(private questionFormService: QuestionFormService) { }

  ngOnInit() {
    this.questionFormService.getRoles().subscribe((res) => {
      this.roles = res;
      if (this.roles && this.roles.length > 0) {
        this.selectedRole = this.roles[0].role_id;
      }

      this.loadSelectedTopicByRoleID();
    });
  }


  loadSelectedTopicByRoleID() {
    this.loading = true;

    this.questionFormService.getTopics().subscribe((res: TopicDetail[]) => {
      this.topics = [];
      res.map((topic: TopicDetail) => {
        let topicRole: TopicRole = { topic_id: topic.id, role_id: this.selectedRole, topic_name: topic.name, topic_description: topic.description, topic_from_date: topic.from_date, topic_to_date: topic.to_date, selected: false };
        this.topics.push(topicRole);
      });

      this.questionFormService.getTopicsByRole(this.selectedRole).subscribe((res) => {
        res.map((topic: TopicRole) => {
          const index = this.topics.findIndex(x => x.topic_id === topic.topic_id);
          if (index) {
            this.topics[index].selected = true;
          }
        });
      });
    }, (error) => { }, () => {
      this.loading = false;
    });


  }

  onRoleChange(role_id: String) {
    this.selectedRole = role_id;
    this.loadSelectedTopicByRoleID();
  }

  onChkTopicChange(topic_id: string, isChecked: boolean) {
    console.log('TOPIC : ', this.topics);
  }
}
