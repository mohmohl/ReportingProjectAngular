import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FcdbNewUser } from 'src/models/fcdb/FcdbNewUser';
import { FcdbChannelUserService } from 'src/services/FcdbChannelUserService';
import * as fileSaver from 'file-saver';
import { map } from 'rxjs/operators';

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

  download() {
    this.loading = true;

    this.service.downloadNewUsers().pipe(
      map((data: any) => {
        this.saveFile(data, 'iBankingChangedUsers_' + this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') + '.xlsx', 'application/vnd.ms-excel');

        this.loading = false;
        console.log("Finish >>>")
        this.error = '';
      }))
      .subscribe((res) => {
        this.loading = false;
        this.error = '';
      }, (error) => {
        this.loading = false;
        this.error = 'Something went wrong';
        console.log(error);
      });

    this.loading = false;
  }

  saveFile(data: any, fileName?: string, fileType?: string): void {
    const blob = new Blob([data], { type: fileType });
    fileSaver.saveAs(blob, fileName);

  }
}
