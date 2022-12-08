import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstrumentAPIRequestMessage } from 'src/models/InstrumentAPIRequestMessage';
import {User} from 'src/models/User';
import { InstrumentService } from 'src/services/InstrumentService';
import {InstrumentAPIResponseMessage} from 'src/models/InstrumentAPIResponseMessage';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.css']
})
export class InstrumentComponent implements OnInit {
  loading = false;
  error = '';
  message = '';
  data : InstrumentAPIRequestMessage = new InstrumentAPIRequestMessage();
  response : InstrumentAPIResponseMessage = new InstrumentAPIResponseMessage();
  login_user : User = new User();
  submitDisable =true;
  chkDisable = false;
  form = new FormGroup({
    instruNo : new FormControl('',[Validators.required,Validators.maxLength(6)]),
    fromBranch : new FormControl('',Validators.required),
    toBranch : new FormControl('',Validators.required)
  });

  constructor(private service: InstrumentService) { }

  ngOnInit() {
    
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  checkInstrument(){
    debugger;
    this.message = "";
    this.data.instruNo = this.form.get(["instruNo"])!.value;
    this.data.fromBranch     = this.form.get(["fromBranch"])!.value;
    this.data.toBranch = this.form.get(["toBranch"])!.value;

    console.log("save data >>>>>>" + JSON.stringify(this.data));

    if(this.form.invalid){
      if(this.data.instruNo == "" || this.data.instruNo ==null || this.data.instruNo == "0" ){
        this.error = "Remittance PO Number is required.";
      }else if(this.data.instruNo.length < 6 || this.data.instruNo.length > 6){
        this.error = "Remittance PO Number must be have 6 digits.";
      }else if(this.data.toBranch == "" ){
        this.error = "From_Branch is required.";
      }else if(this.data.toBranch == ""){
        this.error = "To_Branch is required.";
      }
      return;
    }
    
    this.loading = true;
    this.error ="";
    this.message = "";
    
    this.login_user = JSON.parse(localStorage.getItem('currentUser'));
    this.response = new InstrumentAPIResponseMessage();
    this.service.checkInstrumentData(this.data).subscribe( res =>{
      this.loading = false;
      this.response = res;
      
      if(this.response.messageCode =="-1"){
        this.message = this.response.message;
      }else{
        this.submitDisable= false;
      }

    },
    error => {
      this.loading = false;
      this.error = "Internal Server Error";
      console.log(error);
    });
    
  }


  submit(){
    debugger;

    if (window.confirm("Are you sure you want to proceed?")) { 

    this.message = "";
    this.data.instruNo = this.form.get(["instruNo"])!.value;
    this.data.fromBranch     = this.form.get(["fromBranch"])!.value;
    this.data.toBranch = this.form.get(["toBranch"])!.value;

    console.log("save data >>>>>>" + JSON.stringify(this.data));

    if(this.form.invalid){
      if(this.data.instruNo == "" || this.data.instruNo ==null || this.data.instruNo == "0" ){
        this.error = "Remittance PO Number is required.";
      }else if(this.data.instruNo.length < 6 || this.data.instruNo.length > 6){
        this.error = "Remittance PO Number must be have 6 digits.";
      }else if(this.data.toBranch == "" ){
        this.error = "From_Branch is required.";
      }else if(this.data.toBranch == ""){
        this.error = "To_Branch is required.";
      }
      return;
    }
    
    this.loading = true;
    this.error ="";
    this.message = "";
    this.submitDisable = true;

    this.login_user = JSON.parse(localStorage.getItem('currentUser'));
    //this.data.user_id = this.login_user.userId;
    //console.log("u_id >>>>>>>>>>> " + this.data.user_id);
    
    this.response = new InstrumentAPIResponseMessage();
    this.service.updateData(this.data).subscribe( res =>{
      this.response = res;
      this.message = this.response.message;
      this.loading = false;
      this.submitDisable = false;
    },
    error => {
      this.loading = false;
      this.submitDisable = false;
      this.error = "Internal Server Error";
      console.log(error);
    });
    
  }else{
    console.log("Update Cancelled.");
  }
  }

}
