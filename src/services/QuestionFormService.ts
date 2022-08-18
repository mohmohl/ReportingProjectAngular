import { Topic } from 'src/models/question_form/Topic';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class FcdbChannelUserService {

    pdfheaders = new HttpHeaders({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf' });

    constructor(private http: HttpClient) {
    }

    public getQuestionForms() {
        return this.http.get<any>(`${environment.baseUrl}` + '');
    }

    public getQuestionFormByID(id: number) {
        return this.http.get<any>(`${environment.baseUrl}` + '');
    }

    public submitQuestion(topic: Topic) {
        return this.http.post<any>(`${environment.baseUrl}` + '', topic);
    }

}