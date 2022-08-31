import { Checksum } from './../../../../models/tagit/Checksum';
import { TagitService } from './../../../../services/TagitService';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-sum',
  templateUrl: './check-sum.component.html',
  styleUrls: ['./check-sum.component.css']
})
export class CheckSumComponent implements OnInit {

  constructor(private fb: FormBuilder, private tagitSerice: TagitService) { }

  formSubmitted = false;
  loading = false;

  checksum: Checksum;

  form = this.fb.group({
    merchantId: new FormControl('', Validators.required),
    merchantName: new FormControl('', Validators.required),
    orderId: new FormControl('', Validators.required),
    orderDetails: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    timeStamp: new FormControl('', Validators.required),
    timeout: new FormControl('', Validators.required),
    callback: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.valid) {
      //console.log(JSON.stringify(this.form.value));
      this.tagitSerice.getCheckSum(this.form.value).subscribe((res) => {
        this.checksum = res;
      });

    }
  }


}

