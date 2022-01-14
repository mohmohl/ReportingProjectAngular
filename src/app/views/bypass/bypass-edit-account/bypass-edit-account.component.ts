import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CashWithdrawExpAccService } from 'src/services/CashWithdrawExpAccService';
import { CashWithdrawExpAcc } from 'src/models/CashWithdrawExpAcc';
import {User} from 'src/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bypass-edit-account',
  templateUrl: './bypass-edit-account.component.html',
  styleUrls: ['./bypass-edit-account.component.css']
})
export class BypassEditAccountComponent implements OnInit {

  loading = false;
  error = '';
  message = '';
  result : boolean;
  data : CashWithdrawExpAcc = new CashWithdrawExpAcc();
  validate = false;
  login_user : User = new User();
  cust_ac_no : string;
  constructor(private service: CashWithdrawExpAccService,private router: Router,private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
    debugger;
    /*this.activatedRoute.queryParams.subscribe(
      params => {
        this.cust_ac_no =  params['cust_ac_no'];
      })*/
      this.activatedRoute.paramMap.subscribe(params => {
        this.cust_ac_no = params.get('param1'); 
        console.log("edit component >>>>>  " + this.cust_ac_no);
      })
    this.searchEditData(this.cust_ac_no); 
  }

  searchEditData(cust_ac_no){
    debugger;
    this.loading = true;
    this.data = new CashWithdrawExpAcc();
    this.service.searchEditData(cust_ac_no).subscribe( res =>{
      this.data = res;
      //console.log("search edit data >>>>> " + JSON.stringify(this.data));
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.error = "Internal Server Error";
      console.log(error);
    });
  }

  keyPressNumbers(event) {
    //debugger;
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  submit(){
    //debugger;
    this.validate = false;

    if(this.data.amount == "" || this.data.amount == "0"){
        this.error = "Amount is required."
        this.validate = true;
    }else if(this.data.recommended_by == ""){
      this.error = "Recommended By is required.";
      this.validate = true;
    }

    if(!this.validate){
      this.loading = true;
      this.error = "";
      this.message = "";

      this.login_user = JSON.parse(localStorage.getItem('currentUser'));
      this.data.user_id = this.login_user.userId;

      //console.log("save edit data >>>>>>>>>>> " + JSON.stringify(this.data));
      this.service.saveEditData(this.data).subscribe( res =>{
        this.result = res;
        if(this.result == true){
          this.message = "Update Successful."
        }else{
          this.message = "Update Fail.";
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.error = "Internal Server Error";
        console.log(error);
      });
    
    }
    
  }

  goback(){
    this.router.navigateByUrl("/bypass-account-list");
  }

}
