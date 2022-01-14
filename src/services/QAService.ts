import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { MABAnsweringObj } from "src/models/MABAnsweringObj";
import { MABQuestion } from "src/models/MABQuestion";
import { MABSurvey } from "src/models/MABSurvey";
@Injectable({
  providedIn: 'root'
})
export class QAService{
    constructor(private http: HttpClient) {

    }
    public getQuestionList() {
        var api = environment.baseUrl + '/survey/getSurveyQuestionList';
        return this.http.get<any>(`${api}`);
      }
      public requestToAnswer(req: MABAnsweringObj) {

        var api = environment.baseUrl + '/survey/survey_answering_request';
        return this.http.post<any>(`${api}`, req);
    
      }
      public get_answeringData(branch:string) {
        var api = environment.baseUrl + '/survey/searchImportedData?branch='+branch;
        return this.http.post<any>(`${api}`,{title:'imported data request'});
      }
      public getBranchDataList() {
        var api = environment.baseUrl + '/survey/getBranchDataList';
        return this.http.get<any>(`${api}`);
      }
      
      public getAnsweredUserDataList(branch:string) {
        var api = environment.baseUrl + '/survey/getAnsweredUserDataList?branch='+branch;
        return this.http.get<any>(`${api}`);
      }
      
      public getAnswerListByUser(branch:string,userId:string) {
        var api = environment.baseUrl + '/survey/getAnswerListByUser?branch='+branch+"&userId="+userId;
        return this.http.post<any>(`${api}`,{title:'Answering Report'});
      }
      
      public getSurveyDataList() {
        var api = environment.baseUrl + '/survey/getSurveyDataList';
        return this.http.get<any>(`${api}`);
      }

      public getQuestionBySurveyId(surveyId:string) {
        var api = environment.baseUrl + '/survey/getQuestionBySurveyId?surveyId='+surveyId;
        return this.http.post<any>(`${api}`,{title:"Get Survey Question"});
      }

      public saveToQuestion(req: MABQuestion) {
        var api = environment.baseUrl + '/survey/saveQuestion';
        return this.http.post<any>(`${api}`, req);
    
      }
      public saveToSurvey(req: MABSurvey) {
        var api = environment.baseUrl + '/survey/saveSurvey';
        return this.http.post(`${api}`,req);
    
      }
}