import { ResultReport } from './../../../../models/question_form/ResultReport';
import { QuestionFormService } from 'src/services/QuestionFormService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-report',
  templateUrl: './question-report.component.html',
  styleUrls: ['./question-report.component.css']
})
export class QuestionReportComponent implements OnInit {

  constructor(private questionService: QuestionFormService) {
  }

  resultReports: ResultReport[];

  ngOnInit() {
    this.questionService.getResultReport().subscribe((res) => {
      this.resultReports = res;
    });
  }

}
