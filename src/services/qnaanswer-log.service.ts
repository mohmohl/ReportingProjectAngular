import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnswerLog } from 'src/models/question_form/AnswerLog';

@Injectable({
  providedIn: 'root'
})
export class QNAAnswerLogService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  constructor(private http: HttpClient) {
  }

  public getCandidateAnswerLog(id: string): Observable<AnswerLog> {
    return this.http.get<AnswerLog>(`${environment.baseUrl}` + `/api/qna/answerlogs?topic_id=${id}`, { headers: this.headers });
  }

  public updateCandidateAnswerLog(id: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}` + `/api/qna/answerlogs?topic_id=${id}`, { headers: this.headers });
  }

}
