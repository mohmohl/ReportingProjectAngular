import { Observable } from 'rxjs/Observable';
import { PaymentGateway } from './../models/tagit/PaymentGateway';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { MABAnsweringObj } from "src/models/MABAnsweringObj";
import { MABQuestion } from "src/models/MABQuestion";
import { MABSurvey } from "src/models/MABSurvey";
import { Checksum } from 'src/models/tagit/Checksum';

@Injectable({
  providedIn: 'root'
})
export class TagitService {
  constructor(private http: HttpClient) {

  }

  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

  public getCheckSum(formData: PaymentGateway): Observable<Checksum> {
    var api = environment.baseUrl + '/api/tagit/check-sum';

    return this.http.post<Checksum>(`${api}`, formData, { headers: this.headers });
  }

}