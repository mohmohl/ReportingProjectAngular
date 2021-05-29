import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/AuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  currentUser : User;
  constructor(private authService:AuthenticationService,private bnIdle: BnNgIdleService,private router: Router) {
   }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.bnIdle.startWatching(30).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.authService.applicationBackend_logout(this.currentUser.userId);
        this.router.navigate(['/auth/login']);
      }
    });
  }
  

}
