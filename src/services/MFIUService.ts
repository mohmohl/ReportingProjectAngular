import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { MFIUReportDto } from "src/models/MFIUReportDto";
import { MFIUSetupDTO } from "src/models/MFIUSetupDTO";
@Injectable({
  providedIn: 'root'
})
export class MFIUService {
 
    constructor(private http: HttpClient) {
    }

    public checking_role() {
      var api = environment.baseUrl + '/mfiureport/checking_role';
      return this.http.post<any>(`${api}`,null);
    }
     public getMFIUBranchRecord(branch:string) {
        var api = environment.baseUrl + '/mfiureport/get_branch_mfiu_data?branch='+branch;
        return this.http.post<any>(`${api}`,null);
      }
      public update_field_mfiu(obj:MFIUReportDto) {
        var api = environment.baseUrl + '/mfiureport/update_mfiu_data';
        return this.http.post<any>(`${api}`,obj);
      }

      public send_mfiu_record(fromstatus:number,sendstatus:number,branch:string) {
        var api = environment.baseUrl + '/mfiureport/send_mfiu_data?fromStatus='+fromstatus+"&sendStatus="+sendstatus+"&branch="+branch;
        return this.http.post<any>(`${api}`,null);
      }

      
      public getMFIUHORecord(fromDate:string,toDate:string,branch:string,statusId:number,resendStatusId:number) {
        var api = environment.baseUrl + '/mfiureport/get_mfiu_ho_data_with_status?fromDate='+fromDate+'&toDate='+toDate+'&branch='+branch+'&statusId='+statusId+'&resendStatusId='+resendStatusId;
        return this.http.post<any>(`${api}`,null);
      }

      
      public updateMFIUByEntryNO(status:number,entry_no:string) {
        var api = environment.baseUrl + '/mfiureport/update_mfiu_by_entryNo?status='+status+'&entry_no='+entry_no;
        return this.http.post<any>(`${api}`,null);
      }

      public send_mfiu(fromstatus:number,sendstatus:number,branch:string,fromdate,toDate:string){
        var api = environment.baseUrl + '/mfiureport/send_mfiu';
        return this.http.post<any>(`${api}`,{'branch':branch,'fromdate':fromdate,'todate':toDate,'fromStatus':fromstatus,'sendStatus':sendstatus});
      }


      public get_download_file_type(branch:string,fromDate:string,fileType:string){
        // return this.http.get(this.api,{params:accParam});
        var api = environment.baseUrl+'/mfiureport/get_download_file_type?fromDate='+fromDate+'&branch='+branch+'&fileType='+fileType;
          return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
      }
      public get_download_checking(branch:string,fromDate:string,toDate:string,fileType:string){
        // return this.http.get(this.api,{params:accParam});
        var api = environment.baseUrl+'/mfiureport/get_download_checking?fromDate='+fromDate+'&toDate='+toDate+'&branch='+branch+'&fileType='+fileType;
          return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
      }
      public getMFIU_setup_list() {
        var api = environment.baseUrl + '/mfiureport/get_mfiu_setup_data_list';
        return this.http.get<any>(`${api}`);
      }

      
      public save_mfiu_setup(obj:MFIUSetupDTO){
        var api = environment.baseUrl + '/mfiureport/save_mfiu_setup';
        return this.http.post<any>(`${api}`,obj);
      }

      
      public get_email_setup(branch:string){
        var api = environment.baseUrl + '/mfiureport/get_email_setup?branch='+branch;
        return this.http.post<any>(`${api}`,null);
      }

      
      public save_mfiu_email_record(obj:MFIUSetupDTO){
        var api = environment.baseUrl + '/mfiureport/save_mfiu_email_record';
        return this.http.post<any>(`${api}`,obj);
      }

      
      public get_mfiu_email_template(){
        var api = environment.baseUrl + '/mfiureport/get_mfiu_email_template';
        return this.http.post<any>(`${api}`,null);
      }
      
      public save_mfiu_email_template(obj:MFIUSetupDTO){
        var api = environment.baseUrl + '/mfiureport/save_mfiu_email_template';
        return this.http.post<any>(`${api}`,obj);
      }

    }