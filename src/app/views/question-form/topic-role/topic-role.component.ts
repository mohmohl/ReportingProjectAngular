import { TopicDetail } from 'src/models/question_form/TopicDetail';
import { QuestionFormService } from './../../../../services/QuestionFormService';
import { Component, OnInit } from '@angular/core';
import { ReportRole } from 'src/models/ReportRole';
import { TopicRole } from 'src/models/question_form/TopicRole';
import { User } from 'src/models/User';

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
  created_by: String;

  message: String;

  constructor(private questionFormService: QuestionFormService) { }

  ngOnInit() {
    let login_user: User = JSON.parse(localStorage.getItem('currentUser'));
    this.created_by = login_user.userId;

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
        let topicRole: TopicRole = {
          topic_id: topic.id,
          role_id: this.selectedRole,
          created_by: this.created_by,
          topic_name: topic.name,
          topic_description: topic.description,
          topic_from_date: topic.from_date,
          topic_to_date: topic.to_date,
          selected: false
        };

        this.topics.push(topicRole);
      });

      this.questionFormService.getTopicsByRole(this.selectedRole).subscribe((res) => {
        res.map((topic: TopicRole) => {
          let index = this.topics.findIndex(x => x.topic_id === topic.topic_id);
          if (index > -1) {
            this.topics[index].selected = true;
          }
        });
      });
    }, (error) => { }, () => {
      this.loading = false;
    });
    this.message = "";
  }

  onRoleChange(role_id: String) {
    this.selectedRole = role_id;
    this.loadSelectedTopicByRoleID();
  }

  onChkTopicChange(topic_id: string, isChecked: boolean) {
    console.log('TOPIC : ', this.topics);
  }

  onSave() {
    let selectedList = this.topics.filter(x => x.selected);
    this.questionFormService.saveTopicsByRole(selectedList, this.selectedRole).subscribe((res) => {
      debugger;
      if (res > 0) {
        this.message = "Save Successfully";
      }
      else {
        this.message = "Save failed";
      }
    });
  }
}
