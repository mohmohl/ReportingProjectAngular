import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { MABAnsweringObj } from "src/models/MABAnsweringObj";
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
}