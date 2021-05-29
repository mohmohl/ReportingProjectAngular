import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { TransactionService } from 'src/services/TransactionService';

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.scss']
})
export class SimplePageComponent implements OnInit {

  constructor(private apiService : TransactionService,private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.apiService.getTestingData().subscribe(res=>{
     console.log("api test = "+res.toString());
    });
  }

}
