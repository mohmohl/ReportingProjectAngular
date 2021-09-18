import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
@Injectable({
    providedIn: 'root'
  })
  export class BankStatementService {
   
    headers = new HttpHeaders({'Content-Type':'application/pdf','Accept': 'application/pdf',});
    httpOptions:any;
    constructor(private http: HttpClient,private authenticationService: AuthenticationService) { 
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json' ,
          'Authorization': 'Bearer '+this.authenticationService.currentUserValue.token ,
          'Accept' : 'application/json'
        })
      };
    }

    public getYearsList():Observable<any>{
  
      var api = environment.baseUrl+'/bankStatement/getPassYearList';
      return this.http.get<any>(`${api}`);
     
  }

    public searchPassBankStatement(accNo:string,filePath:string,fileType:string){
        let accParam = new HttpParams().set('accountNo', accNo);
        // return this.http.get(this.api,{params:accParam});
        var api = environment.baseUrl+'/bankStatement/searchPassBankStatement?accountNo='+accNo+"&filePath="+filePath+"&fileType="+fileType;
          return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
       
    }

    public createBankStatement(accNo:string,fileType:string,fromDate:string,toDate:string,printDate:string){
      // return this.http.get(this.api,{params:accParam});
      var api = environment.baseUrl+"/bankStatement/getBankStatement?accountNo="+accNo+"&fileType="+fileType+"&fromDate="+fromDate+"&toDate="+toDate+"&printDate="+printDate;
        return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
    }
    
    public viewBankStatement(accNo:string,fromDate:string,toDate:string,printDate:string){
      // return this.http.get(this.api,{params:accParam});
      var api = environment.baseUrl+"/bankStatement/getBankStatementView?accountNo="+accNo+"&fromDate="+fromDate+"&toDate="+toDate+"&printDate="+printDate;
        return this.http.get<any>(`${api}`, {responseType: 'json'});
    }
    
}