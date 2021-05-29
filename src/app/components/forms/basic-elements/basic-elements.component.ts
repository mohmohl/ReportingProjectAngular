import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/AuthenticationService';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    console.log("login user = "+this.authenticationService.currentUserValue.token);
  }

}
