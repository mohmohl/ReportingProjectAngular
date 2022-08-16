import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ChannelUser } from 'src/models/fcdb/ChannelUser';
import { FcdbViewModel } from 'src/models/fcdb/FcdbViewModel';
import { FcdbChannelUserService } from 'src/services/FcdbChannelUserService';

@Component({
  selector: 'app-duplicate-channel-user-checker',
  templateUrl: './duplicate-channel-user-checker.component.html',
  styleUrls: ['./duplicate-channel-user-checker.component.css']
})
export class DuplicateChannelUserCheckerComponent implements OnInit {

  loading = false;

  error = '';
  duplicatedUsers: FcdbViewModel[];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private service: FcdbChannelUserService) { }

  ngOnInit() {
    this.loading = false;
  }

  submit() {
    this.duplicatedUsers = null;
    let user_id = this.form.controls['name'].value;
    this.loading = true;
    var buttonName = document.activeElement.getAttribute("name");

    console.log(buttonName);
    if (buttonName == null || buttonName == 'search') {
      //var regex = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
      let regex = new RegExp('^(?=.*[0-9])(?=.*[A-Z])([A-Z0-9]){7,15}$');

      if (user_id == '' || user_id == undefined || user_id == null) {
        this.error = 'User ID is required';
      } else if (regex.test(user_id) == false) {
        this.error = 'Invalid User ID format';
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
    this.loading = false;
  }

  reset() {
    this.duplicatedUsers = null;
    this.error = '';
  }

}
