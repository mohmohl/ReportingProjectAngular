import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public doGet(url:string): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}`+url);
  }


  public doPost(url:string, j:any): Observable<any>{

   return this.http.post<any>(`${environment.baseUrl}`+ url,{title:j});
  }

  headers = new HttpHeaders({'Content-Type':'application/pdf','Accept': 'application/pdf',});
    
  public export_excel(url:string){
  
      var api = environment.baseUrl+url;
        return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
      
  }
  
  public export_PDF(url:string){
    var api = environment.baseUrl+url;
      return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
    
  }

  public export_POST_PDF(url:string, obj :any){

    var api = environment.baseUrl+url;
    let params = JSON.stringify(obj);
    var headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json',});
    
      return this.http.post<any>(`${api}`, params,{headers : headers,responseType: 'arraybuffer' as 'json'});
    
  }

  public generatePost_PDF(url:string, obj :any, filename: string){

    var api = environment.baseUrl+url;
    let params = JSON.stringify(obj);
    var headers = new HttpHeaders({'Content-Type':'application/json','Accept': 'application/json',});
    
      return this.http.post<any>(`${api}`, params,{headers : headers,responseType: 'arraybuffer' as 'json'}).pipe(
        map((data: any) => {
          
          let blob = new Blob([data], {
            type: "application/pdf"
          });
          var a = document.createElement("a");
          var file = new Blob([data], {type: 'application/pdf'});
          var fileURL = URL.createObjectURL(file);
          a.href = fileURL;
          a.target     = '_blank'; 
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        }));
  }
}
