import { Observable } from 'rxjs';
import { TopicDetail } from 'src/models/question_form/TopicDetail';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QuestionFormService {

    headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    constructor(private http: HttpClient) {
    }

    public getQuestionForms(): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + '/api/qna/topic/candidate-view', { headers: this.headers });
    }

    public getQuestionFormByID(id: number): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + '/api/qna/topic/' + id, { headers: this.headers });
    }

    public submitQuestion(topic: TopicDetail): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}` + '/api/qna/topic', topic, { headers: this.headers });
    }

}