import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ChannelUser } from 'src/models/fcdb/ChannelUser';
import { FcdbChannelUserService } from 'src/services/FcdbChannelUserService';
import * as fileSaver from 'file-saver';
import { FcdbViewModel } from 'src/models/fcdb/FcdbViewModel';

@Component({
  selector: 'app-duplicate-channel-user',
  templateUrl: './duplicate-channel-user.component.html',
  styleUrls: ['./duplicate-channel-user.component.css']
})
export class DuplicateChannelUserComponent implements OnInit {

  loading = false;

  error = '';

  duplicatedUsers: FcdbViewModel[];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private service: FcdbChannelUserService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.loading = false;
  }

  saveFile(data: any, fileName?: string, fileType?: string): void {
    const blob = new Blob([data], { type: fileType });
    fileSaver.saveAs(blob, fileName);

  }

  submit() {
    this.duplicatedUsers = null;
    let user_id = this.form.controls['name'].value;
    this.loading = true;
    var buttonName = document.activeElement.getAttribute("name");

    console.log(buttonName);
    if (buttonName == null || buttonName == 'search') {
      var regex = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
      if (user_id == '' || user_id == undefined || user_id == null) {
        this.error = 'User ID is required';
      } else if (regex.test(user_id)) {
        this.error = 'Special characters are not allowed';
      }
      else {
        this.service.isUserExists(user_id).subscribe(res => {
          this.loading = false;
          this.error = '';

          this.duplicatedUsers = res;
          console.log(this.duplicatedUsers);
        },
          error => {
            this.error = 'Something went wrong';
            console.log(error);
          });
      }
    }
    else {
      this.service.getDuplicatedUser().pipe(
        map((data: any) => {
          // let blob = new Blob([data], {
          //   type: 'application/vnd.ms-excel'
          // });
          // var link = document.createElement('a');
          // link.download = 'Fcdb_duplicate_users_'+ this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') +'.xlsx'
          // link.href = window.URL.createObjectURL(blob);
          // link.target = '_blank';

          // link.click();
          // window.URL.revokeObjectURL(link.href);

          this.saveFile(data, 'Fcdb_duplicate_users_' + this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') + '.xlsx', 'application/vnd.ms-excel');

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
        })
    }
    this.loading = false;
  }

  reset() {
    this.duplicatedUsers = null;
  }
}

