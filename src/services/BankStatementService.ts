import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
  })
  export class SearchPDFService {
   
    headers = new HttpHeaders({'Content-Type':'application/pdf','Accept': 'application/pdf',});
    constructor(private http: HttpClient) { 
    }

    public getYearsList():Observable<any>{
  
      var api = environment.baseUrl+'/getPassYearList';
      return this.http.get<any>(`${api}`);
     
  }

    public searchPassBankStatement(accNo:string,filePath:string){
        let accParam = new HttpParams().set('accountNo', accNo);
        // return this.http.get(this.api,{params:accParam});
        var api = environment.baseUrl+'/searchPassBankStatement?accountNo='+accNo+"&filePath="+filePath;
          return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
       
    }

    public createBankStatement(accNo:string,fromDate:Date,toDate:Date){
      console.log("accountNo= "+accNo);
      console.log("fromDate= "+fromDate);
      console.log("toDate= "+toDate);
      // return this.http.get(this.api,{params:accParam});
      var api = environment.baseUrl+"/getBankStatement?accountNo="+accNo+"&fromDate="+fromDate+"&toDate="+toDate;
        return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
     
  } 
    
}