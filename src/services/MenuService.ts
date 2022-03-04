import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { MenuItem } from "src/models/menuItem";

@Injectable({
    providedIn: 'root'
  })
  export class MenuService {
    constructor(private http: HttpClient) { 
    }

    public getMenuData(): Observable<any>{
      var api = environment.baseUrl+'/menu/getmenuListData';
       return this.http.get<any>(api);
    }

    public getCategoryData(): Observable<any>{
      var api = environment.baseUrl+'/menu/getCategoryListData';
       return this.http.get<any>(api);
    }
    //   return this.http.post<any>(`${api}`,{name:name});

    public saveCategory(categoryName: string): Observable<any>{
      let api = environment.baseUrl + '/menu/saveCategory?categoryName=' + categoryName;
      return this.http.post<any>(`${api}`,categoryName);
    }

    public saveMenu(data: MenuItem): Observable<any>{
      let api = environment.baseUrl + '/menu/saveMenu';
      return this.http.post<any>(`${api}`,data);
    }





 
  }