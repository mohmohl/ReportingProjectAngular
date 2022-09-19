import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DialogService {
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Are you sure to leave this page?');

    return of(confirmation);
  };
} 