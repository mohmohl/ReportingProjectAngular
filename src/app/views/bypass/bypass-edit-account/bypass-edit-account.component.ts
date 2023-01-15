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
  channel_name : string;
  channelList : string [];
  submitDisable = false;
  constructor(private service: CashWithdrawExpAccService,private router: Router,private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
      // this.activatedRoute.paramMap.subscribe(params => {
      //   this.cust_ac_no = params.get('param1'); 
      //   console.log("edit component >>>>>  " + this.cust_ac_no);
      //   this.channel_name = params.get('param2');
      // });
    
    this.activatedRoute.queryParams
    .subscribe(param =>{
      //console.log ("params >>"+param);
      this.cust_ac_no = param['cust_ac_no'];
      this.channel_name = param['channel_name'];
    });

      //get editData
    this.searchEditData(this.cust_ac_no,this.channel_name); 
  }

  searchEditData(cust_ac_no,channel_name){
    this.loading = true;
    this.data = new CashWithdrawExpAcc();
    this.service.searchEditData(cust_ac_no,channel_name).subscribe( res =>{
      this.data = res;
      //console.log("search edit data >>>>> " + JSON.stringify(this.data));
      //console.log("channel_name >>>" + this.data.channel_name);
      this.channelList = this.data.channel_list;
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.error = "Internal Server Error";
      //console.log(error);
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
    }else if(this.data.channel_name =="" || this.data.channel_name ==null){
      this.error ="Channel is required";
      this.validate = true;
    }

    if(!this.validate){
      this.loading = true;
      this.error = "";
      this.message = "";

      this.submitDisable = true;

      this.login_user = JSON.parse(localStorage.getItem('currentUser'));
      this.data.user_id = this.login_user.userId;

      //console.log("save edit data >>>>>>>>>>> " + JSON.stringify(this.data));
      this.service.saveEditData(this.data).subscribe( res =>{
        this.result = res;
        if(this.result == true){
          this.message = "Update Successful."
        }else{
          this.message = "This record is already exist.";
        }
        this.loading = false;
        this.submitDisable = false;
      },
      error => {
        this.loading = false;
        this.submitDisable = false;
        this.error = "Internal Server Error";
        //console.log(error);
      });
    
    }
    
  }

  goback(){
    this.router.navigateByUrl("/bypass-account-list");
  }

}
