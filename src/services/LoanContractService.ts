import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoanContractService {
    constructor(private http: HttpClient) {
    }

    public searchContractNo(contractNo: string, keyword: string): Observable<any> {

        var api = environment.baseUrl + '/loan?contractNo=' + contractNo + '&keyword=' + encodeURIComponent(keyword);
        return this.http.get<any>(`${api}`, { responseType: 'json' });

    }

    public viewAccount(contract_no: string, file_name: string) {
        
        var api = environment.baseUrl + '/loan/pdf/' + contract_no + '/' + file_name;
        return this.http.get(`${api}`,{ responseType: 'blob' });

    }

}