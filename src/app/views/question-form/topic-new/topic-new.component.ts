import { Option } from 'src/models/question_form/Option';
import { TopicDetail } from './../../../../models/question_form/TopicDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import SampleJson from '../../../../assets/maker_topic.json';
import { Question } from 'src/models/question_form/Question';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-topic-new',
  templateUrl: './topic-new.component.html',
  styleUrls: ['./topic-new.component.css']
})
export class TopicNewComponent implements OnInit {

  formSubmitted = false;
  topic: TopicDetail;
  question_type: string[] = ['radio', 'checkbox'];

  form = this.fb.group({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    from_date: new FormControl(new Date(), Validators.required),
    to_date: new FormControl(new Date(), Validators.required),
    questions: this.fb.array([]),
  });

  constructor(private router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  questions(): FormArray {
    return this.form.get("questions") as FormArray
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      description: '',
      type: 'radio',
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

  // answers(questIndex: number): FormArray {
  //   return this.questions()
  //     .at(questIndex)
  //     .get('options') as FormArray;
  // }

  // newAnswer(): FormGroup {
  //   return this.fb.group({
  //     option_id: ''
  //   });
  // }

  // addAnswer(questIndex: number) {
  //   this.answers(questIndex).push(this.newAnswer());
  // }

  // removeAnswer(questIndex: number, index: number) {
  //   this.answers(questIndex).removeAt(index);
  // }


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
    debugger;
    this.formSubmitted = true;
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));

      this.prepareSubmitData();

      console.log(JSON.stringify(this.topic));
    }
  }

  prepareSubmitData() {
    this.topic = new TopicDetail();
    this.topic.name = this.form.value.name;
    this.topic.description = this.form.value.description;
    this.topic.from_date = this.form.value.from_date;
    this.topic.to_date = this.form.value.to_date;

    let l_questions: Question[] = [];

    for (let quest of this.form.value.questions) {
      let l_question = new Question();
      l_question.description = quest.description;
      l_question.mark = quest.mark;
      l_question.type = quest.type;

      let l_options: Option[] = [];

      for (let opt of quest.options) {
        let l_option = new Option();
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
    this.router.navigate(['/topic-list']);
  }


  onCheckChange(questIndex: number, optionIndex: number) {
    if (this.form.value.questions[questIndex].type == 'radio') {
      let indexOfOptionsOfCurrentQuestion = 0;

      for (let option of this.form.value.questions[questIndex].options) {
        if (option == this.form.value.questions[questIndex].options[optionIndex]) {
          option.isAnswer = true;
        }
        else {
          const chkOption = document.getElementById('q_' + questIndex + '_opt_' + indexOfOptionsOfCurrentQuestion) as HTMLInputElement;
          chkOption.checked = false;
          option.isAnswer = false;
        }
        indexOfOptionsOfCurrentQuestion++;
      }
    }
  }
}
