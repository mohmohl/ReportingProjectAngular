import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { GovernmentDataUpload } from "src/models/meterBill/GovernmentDataUpload";
import { Meter_Report } from "src/models/meterBill/Meter_Report";
import { Vendor } from "src/models/meterBill/Vendor";

@Injectable({
    providedIn: 'root'
  })
  export class MeterService {
    constructor(private http: HttpClient) { 
    }
  
    // public fileUpload(files:FormData): Observable<any>{
    //   let api = environment.baseUrl + `/meterBill/goverment-import`;
    //   return this.http.post<any>(`${api}`, files);
    // }

    public fileUpload(file:FormData): Observable<any>{
      let api = environment.baseUrl + `/meterBill/government-import`;
      return this.http.post<any>(`${api}`,file);
    }

    public oneFileUpload(file:FormData): Observable<any>{
      let api = environment.baseUrl + `/meterBill/vendor-import`;
      return this.http.post<any>(`${api}`,file);
    }
    // public saveVendor(name:string): Observable<any>{
    //   let api = environment.baseUrl + `/meterBill/saveVendor`;
    //   return this.http.post<any>(`${api}`,{name:name});
    // }

    public saveVendor(data: Vendor): Observable<any>{
      let api = environment.baseUrl + `/meterBill/saveVendor`;
      return this.http.post<any>(`${api}`,data);
    }

    public getVendors(): Observable<any>{
      let api = environment.baseUrl + `/meterBill/getVendors`;
      return this.http.get<any>(`${api}`);
    }

     public getTownships(regionId: string): Observable<any>{
      let api = environment.baseUrl + `/meterBill/getTownships?regionId=` +regionId;
      return this.http.post<any>(`${api}`, {regionId:regionId});
    }

    public getRegions(): Observable<any>{
      let api = environment.baseUrl + `/meterBill/getRegions`;
      return this.http.get<any>(`${api}`);
    }

    public getRegionsById(divisionId: string): Observable<any>{
      let api = environment.baseUrl + `/meterBill/getRegionsById?divisionId=` + divisionId;
      return this.http.post<any>(`${api}`, divisionId);
    }

    public getUploadedMeterBill(regionId: string): Observable<any>{
      let api = environment.baseUrl + `/meterBill/getUploadedData?regionId=` + regionId;
      return this.http.post<any>(`${api}`, regionId);
    }

    public getUploadedVendorMeterBill(divisionId: string): Observable<any>{
      let api = environment.baseUrl + `/meterBill/getUploadedVData?divisionId=` + divisionId;
      return this.http.post<any>(`${api}`, divisionId);
    }

    public getDivisions(): Observable<any>{
      let api = environment.baseUrl + `/meterBill/getDivisions`;
      return this.http.get<any>(`${api}`);
    }

    public deleteMeterBill(): Observable<any>{
      let api = environment.baseUrl + `/meterBill/deleteMBill`;
      return this.http.post<any>(`${api}`,'');
    }

    public deleteVendorMeterBill(): Observable<any>{
      let api = environment.baseUrl + `/meterBill/deleteVBill`;
      return this.http.post<any>(`${api}`,'');
    }

    public deleteUploadedMeterBill(townshipId: string): Observable<any>{
      let api = environment.baseUrl + `/meterBill/deleteUploadedM?townshipId=` + townshipId;
      return this.http.post<any>(`${api}`, townshipId);
    }

    public deleteUploadedVendorMeterBill(vendorId: string): Observable<any>{
      let api = environment.baseUrl + `/meterBill/deleteUploadedV?vendorId=` + vendorId;
      return this.http.post<any>(`${api}`, vendorId);
    }

    public viewReport(data: Meter_Report): Observable<any> {
      let api = environment.baseUrl + `/meterBill/viewReport`;
      return this.http.post<any>(`${api}`, data);
    }


  public exportExcel(divisionId:string,vendorId:string,regionId:string,tspId:string,searchData:string): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}`+'/meterBill/exportExcel?divisionId='+divisionId+'&vendorId='+vendorId+'&regionId='+regionId+'&tspId='+tspId+'&searchData='+searchData,{responseType: 'arraybuffer' as 'json'});
  }

  public get_meter_upload_progress(data_count:number,divi:string,region:string,township:string){
    return this.http.get<any>(`${environment.baseUrl}`+'/meterBill/get_government_file_upload_progress_count?data_count='+data_count+'&division_id='+divi+'&region_id='+region+'&township_id='+township);
  }

  public get_vendor_upload_progress(vendor:string){
    return this.http.get<any>(`${environment.baseUrl}`+'/meterBill/get_vendor_file_upload_progress_count?vendor='+vendor);
  }
 
  }