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
  submitDisable =true;
  chkDisable = false;
  po_count : number =0 ;
  confirm_message : string;
  form = new FormGroup({
    instruNo : new FormControl('',[Validators.required]),
    fromBranch : new FormControl('',Validators.required),
    toBranch : new FormControl('',Validators.required)
  });
  login_user : User = new User();
  constructor(private service: InstrumentService) { }

  ngOnInit() {
    this.loading =true;
    this.service.getPONoCount().subscribe( res =>{
      this.loading = false;
      this.po_count = res;
      console.log("po_count>>>>>"+ JSON.stringify(this.po_count));
      
    },
    error => {
      this.loading = false;
      this.error = "Internal Server Error";
      console.log(error);
    });

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
    //debugger;
    this.message = "";
    this.data.instruNo = this.form.get(["instruNo"])!.value;
    this.data.fromBranch     = this.form.get(["fromBranch"])!.value;
    this.data.toBranch = this.form.get(["toBranch"])!.value;

    console.log("save data >>>>>>" + JSON.stringify(this.data));

    if(this.form.invalid){
      if(this.data.instruNo == "" || this.data.instruNo ==null || this.data.instruNo == "0" ){
        this.error = "Remittance PO Number is required.";
      }else if(this.data.instruNo.length > this.po_count){
        this.error = "Remittance PO Number must be have "+this.po_count+" digits.";
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
    this.data.userId = this.login_user.userId;
    
    this.response = new InstrumentAPIResponseMessage();
    this.service.checkInstrumentData(this.data).subscribe( res =>{
      this.loading = false;
      this.response = res;
      console.log("check response >>>>>"+ JSON.stringify(this.response));
      if(this.response.messageCode =="1"){
        this.confirm_message = this.response.message;
        this.submitDisable= false;
      }else{
        this.message = this.response.message;
      }

    },
    error => {
      this.loading = false;
      this.error = "Internal Server Error";
      console.log(error);
    });
    
  }


  submit(){
    //debugger;

    if (window.confirm(this.confirm_message)) { 

    this.message = "";
    this.data.instruNo = this.form.get(["instruNo"])!.value;
    this.data.fromBranch     = this.form.get(["fromBranch"])!.value;
    this.data.toBranch = this.form.get(["toBranch"])!.value;

    console.log("save data >>>>>>" + JSON.stringify(this.data));

    if(this.form.invalid){
      if(this.data.instruNo == "" || this.data.instruNo ==null || this.data.instruNo == "0" ){
        this.error = "Remittance PO Number is required.";
      }else if(this.data.instruNo.length > this.po_count){
        this.error = "Remittance PO Number must be have "+this.po_count+" digits.";
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
    this.data.userId = this.login_user.userId;

    this.response = new InstrumentAPIResponseMessage();
    this.service.updateData(this.data).subscribe( res =>{
      this.response = res;
      console.log("update response >>>>>"+ JSON.stringify(this.response));
      if(this.response !=null){
        this.message = this.response.message;
      }
      this.loading = false;
      //this.submitDisable = false;
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
