import { ResultReport } from './../models/question_form/ResultReport';
import { TopicRole } from './../models/question_form/TopicRole';
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

    public getTopics(): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + '/api/qna/topic', { headers: this.headers });
    }

    public getTopicsById(topic_id): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + '/api/qna/topic/setup/' + topic_id, { headers: this.headers });
    }

    public getQuestionFormByID(id: number): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + '/api/qna/topic/' + id, { headers: this.headers });
    }

    public submitQuestion(topic: TopicDetail): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}` + '/api/qna/topic/answer', topic, { headers: this.headers });
    }

    public setupQuestion(topic: TopicDetail): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}` + '/api/qna/topic', topic, { headers: this.headers });
    }

    public checkCandidateAnswersByTopicAndCandidate(topicId: number): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + `/api/qna/topic/${topicId}/check-answers/`, { headers: this.headers });
    }

    public isTopicRemovable(topicId: number): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + `/api/qna/topic/isremovable/${topicId}`, { headers: this.headers });
    }

    public deleteTopic(id: number): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}` + `/api/qna/topic/${id}`, { headers: this.headers });
    }

    public getRoles(): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + `/api/qna/topic/roles`, { headers: this.headers });
    }

    public getTopicsByRole(role_id: String): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}` + `/api/qna/topic/topic_role/` + role_id, { headers: this.headers });
    }

    public saveTopicsByRole(topicRoles: TopicRole[], role_id: String): Observable<number> {
        return this.http.post<any>(`${environment.baseUrl}` + `/api/qna/topic/topic_role/` + role_id, topicRoles, { headers: this.headers });
    }

    public getResultReport(): Observable<ResultReport[]> {
        return this.http.get<any>(`${environment.baseUrl}` + `/api/qna/topic/result_report`, { headers: this.headers });
    }

}