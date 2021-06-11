import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  currentUser: User;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private authService: AuthenticationService, private bnIdle: BnNgIdleService, private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.authService.currentUser.subscribe(x => this.currentUser = x);

    let context = this;
    window.addEventListener("beforeunload", function (e) {
      e = e || window.event;
      if (e.isTrusted) {
        //e.returnValue = 'Sure?';
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          context.authService.applicationBackend_logout(currentUser.userId);
        }
      }
    });

    this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('Application session expired');
        this.authService.applicationBackend_logout(this.authService.currentUserValue.userId);
      }
    });

  }
}


