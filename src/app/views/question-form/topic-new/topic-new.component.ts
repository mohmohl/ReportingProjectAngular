import { Option } from 'src/models/question_form/Option';
import { TopicDetail } from './../../../../models/question_form/TopicDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import SampleJson from '../../../../assets/maker_topic.json';
import { Question } from 'src/models/question_form/Question';

@Component({
  selector: 'app-topic-new',
  templateUrl: './topic-new.component.html',
  styleUrls: ['./topic-new.component.css']
})
export class TopicNewComponent implements OnInit {

  formSubmitted = false;
  topic: TopicDetail;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    is_active: new FormControl(false),
    is_open: new FormControl(false),
  });

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form.reset();
    this.activeRoute.params.subscribe(params => {

      let topic_id = params['param1'];
      if (topic_id) {
        //get from service
        this.topic = JSON.parse(JSON.stringify(SampleJson));
        this.form.patchValue({
          name: this.topic.name,
          description: this.topic.description,
        });
      }

    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.topic.name = this.form.get('name').value;
      this.topic.description = this.form.get('description').value;

      console.log(JSON.stringify(this.topic));
    }
  }

  onBack() {
    this.router.navigate(['/topic-list']);
  }

  onAddQuestion() {
    debugger;
    if (!this.topic) {
      this.topic = new TopicDetail();
    }

    let question = new Question();
    question.description = '';
    question.mark = 1;
    question.type = 'checkbox';
    question.options = [];
    question.options.push(new Option());

    if (!this.topic.questions) {
      this.topic.questions = [];
    };

    this.topic.questions.push(question);
  }

}
