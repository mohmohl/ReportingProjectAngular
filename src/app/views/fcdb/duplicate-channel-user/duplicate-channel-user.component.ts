import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ChannelUser } from 'src/models/fcdb/ChannelUser';
import { FcdbChannelUserService } from 'src/services/FcdbChannelUserService';

@Component({
  selector: 'app-duplicate-channel-user',
  templateUrl: './duplicate-channel-user.component.html',
  styleUrls: ['./duplicate-channel-user.component.css']
})
export class DuplicateChannelUserComponent implements OnInit {

  loading = false;

  error = '';
  duplicatedUsers: ChannelUser[];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private service: FcdbChannelUserService) { }

  ngOnInit() {
    this.loading = false;
  }

  submit() {
    debugger;
    let user_id = this.form.controls['name'].value;

    this.loading = true;
    var buttonName = document.activeElement.getAttribute("name");

    console.log(buttonName);
    if (buttonName == 'search') {

      if (user_id == '' || user_id == undefined || user_id == null) {
        this.error = 'User ID is required';
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
          let blob = new Blob([data], {
            type: 'application/octet-stream'
          });
          var link = document.createElement('a');
          link.download = 'Fcdb_duplicate_users.xlsx'
          link.href = window.URL.createObjectURL(blob);
          link.target = '_blank';

          link.click();
          window.URL.revokeObjectURL(link.href);
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

}
