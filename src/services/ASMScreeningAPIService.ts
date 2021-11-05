import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";

export class ASMScreeningAPIService{
    constructor(private http: HttpClient,private authenticationService: AuthenticationService){

    }
}