import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FcdbNewUser } from 'src/models/fcdb/FcdbNewUser';
import { FcdbChannelUserService } from 'src/services/FcdbChannelUserService';

@Component({
  selector: 'app-fcdb-new-user',
  templateUrl: './fcdb-new-user.component.html',
  styleUrls: ['./fcdb-new-user.component.css']
})
export class FcdbNewUserComponent implements OnInit {

  loading = false;

  error = '';

  users: FcdbNewUser[] = [];

  constructor(private service: FcdbChannelUserService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.loading = false;
    this.service.getNewUsers().subscribe((data) => {
      this.users = data;
    });

  }
}
