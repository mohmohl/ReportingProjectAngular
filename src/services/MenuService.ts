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

    public getRoleData(): Observable<any>{
      var api = environment.baseUrl+'/menu/getrolelistData';
     
       return this.http.get<any>(api);
  }
  
  public getallrolelistData(): Observable<any>{
    var api = environment.baseUrl+'/menu/getallrolelistData';
   
     return this.http.get<any>(api);
}
  public getAccessMenuData(role_id:string): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}`+'/menu/get_accessed_menu_data?role_id='+role_id,{title:"Role Menu"});
  }
  public PermitMenuToRole(role_id: string,menuId:string[]) {
   
    return this.http.post(`${environment.baseUrl}/menu/permitMenuToRole`, { role_id,menuId });
  
  }
public save_custom_role(role_id:string){

return this.http.post(`${environment.baseUrl}/menu/save_custom_role?role_id=`+role_id, null);
  }
}