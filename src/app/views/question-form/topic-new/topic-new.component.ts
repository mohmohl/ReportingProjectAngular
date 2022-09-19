import { QuestionType } from './../../../../models/question_form/QuestionType';
import { Option } from 'src/models/question_form/Option';
import { TopicDetail } from './../../../../models/question_form/TopicDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import SampleJson from '../../../../assets/maker_topic.json';
import { Question } from 'src/models/question_form/Question';
import { DateAdapter, TransitionCheckState } from '@angular/material';
import { QuestionFormService } from 'src/services/QuestionFormService';
import { User } from 'src/models/User';

@Component({
  selector: 'app-topic-new',
  templateUrl: './topic-new.component.html',
  styleUrls: ['./topic-new.component.css']
})
export class TopicNewComponent implements OnInit {

  formSubmitted = false;
  topic: TopicDetail;
  question_type: QuestionType[] = [{ id: '1', type: 'checkbox' }, { id: '2', type: 'radio' }];
  loading = false;
  message = '';
  topic_id;

  form = this.fb.group({
    id: '',
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    from_date: new FormControl(new Date(), Validators.required),
    to_date: new FormControl(new Date(), Validators.required),
    questions: this.fb.array([]),
  });

  constructor(private router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>, private questionFormService: QuestionFormService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  questions(): FormArray {
    return this.form.get("questions") as FormArray
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      id: '',
      description: '',
      type: '2',
      mark: 1,
      options: this.fb.array([]),
      // answers: this.fb.array([]),
    })
  }

  addQuestion() {
    this.questions().push(this.newQuestion());
  }

  removeQuestion(questIndex: number) {
    this.questions().removeAt(questIndex);
  }

  options(questIndex: number): FormArray {
    return this.questions()
      .at(questIndex)
      .get('options') as FormArray;
  }

  newOption(): FormGroup {
    return this.fb.group({
      id: '',
      description: '',
      isAnswer: false,
    });
  }

  addOption(questIndex: number) {
    this.options(questIndex).push(this.newOption());
  }

  removeOptoin(questIndex: number, index: number) {
    this.options(questIndex).removeAt(index);
  }

  ngOnInit() {
    this.form.reset();

    this.activeRoute.params.subscribe(params => {

      this.topic_id = params['param1'];
      if (this.topic_id) {
        this.loading = true;

        this.questionFormService.getTopicsById(this.topic_id).subscribe((res) => {

          this.topic = res;
          console.log(JSON.stringify(this.topic));

          this.form.patchValue({
            id: this.topic_id,
            name: this.topic.name,
            description: this.topic.description,
            from_date: new Date(this.topic.from_date),
            to_date: new Date(this.topic.to_date),
            //questions: this.fb.array([]),
          });

          let questIndex = 0;
          for (let q of this.topic.questions) {
            let form_q = this.fb.group({
              id: q.id,
              description: q.description,
              type: q.type.id,
              mark: q.mark,
              options: this.fb.array([]),
            })
            this.questions().push(form_q);

            for (let opt of q.options) {
              let o = this.fb.group({
                id: opt.id,
                description: opt.description,
                isAnswer: opt.is_chosen,
              });

              this.options(questIndex).push(o);
            }

            questIndex++;
          }
        }, () => {
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      }
    });

  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.valid) {
      this.message = '';
      this.prepareSubmitData();

      this.questionFormService.setupQuestion(this.topic).subscribe((res) => {
        this.loading = false;
        this.message = "Question was successfully saved.";

        if (!this.topic_id) {
          this.router.navigate(['/topic-list']);
        }

      }, (error) => {
        this.message = 'Bad request. Date are required. Every question must has a answer. ';
      });

      console.log(JSON.stringify(this.topic));
    }
    else {
      this.message = 'Please fill all required data.';
    }
  }

  prepareSubmitData() {
    this.topic = new TopicDetail();

    let login_user: User = JSON.parse(localStorage.getItem('currentUser'));

    this.topic.id = this.form.value.id;
    this.topic.created_by = login_user.userId;
    this.topic.name = this.form.value.name;
    this.topic.description = this.form.value.description;
    this.topic.from_date = this.form.value.from_date;
    this.topic.to_date = this.form.value.to_date;

    let l_questions: Question[] = [];

    for (let quest of this.form.value.questions) {
      let l_question = new Question();
      l_question.id = quest.id;
      l_question.description = quest.description;
      l_question.mark = quest.mark;
      l_question.type = { id: quest.type, type: '' };

      let l_options: Option[] = [];

      for (let opt of quest.options) {
        let l_option = new Option();
        l_option.id = opt.id;
        l_option.description = opt.description;
        l_option.is_chosen = opt.isAnswer ? 1 : 0;

        l_options.push(l_option);
      }
      l_question.options = l_options;

      l_questions.push(l_question);
    }

    this.topic.questions = l_questions;
  }

  onBack() {
    if (confirm("Unsave data will be lost. Do you want to leave this page?") == true) {
      this.router.navigate(['/topic-list']);
    }
  }


  onCheckChange(questIndex: number, optionIndex: number) {
    debugger;
    if (this.form.value.questions[questIndex].type == '2') {
      let indexOfOptionsOfCurrentQuestion = 0;

      for (let option of this.form.value.questions[questIndex].options) {
        let chkOption = document.getElementById('q_' + questIndex + '_opt_' + indexOfOptionsOfCurrentQuestion) as HTMLInputElement;
        if (option == this.form.value.questions[questIndex].options[optionIndex]) {

          chkOption.checked = true;
          this.form.value.questions[questIndex].options[indexOfOptionsOfCurrentQuestion].isAnswer = 1;
        }
        else {
          chkOption.checked = false;
          this.form.value.questions[questIndex].options[indexOfOptionsOfCurrentQuestion].isAnswer = 0;
        }
        indexOfOptionsOfCurrentQuestion++;
      }
    }

    console.log(this.form);
  }
}
