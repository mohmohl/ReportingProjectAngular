import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { LoanContractService } from 'src/services/LoanContractService';
import { ExportDataService } from 'src/services/ExportDataService';
import { TransactionService } from 'src/services/TransactionService';

import { ContractInfo } from 'src/models/contractInfo';


@Component({
  selector: 'app-loan-contract',
  templateUrl: './loan-contract.component.html',
  styleUrls: ['./loan-contract.component.css']
})
export class LoanContractComponent implements OnInit {

  loading = false;
  contract_no: string;
  keyword: string;
  error = '';
  blob: any;
  disabled = false;

  form = new FormGroup({
    contractno: new FormControl(''),
    keyword: new FormControl('')
  });

  public data_list: ContractInfo[] = null;

  constructor(private contractAPIService: LoanContractService) { }

  ngOnInit() {
  }

  submit() {

    this.error = "";
    this.contract_no = this.form.get(["contractno"])!.value;
    this.keyword = this.form.get(["keyword"])!.value;
    this.loading = true;
    this.disabled = true;
    this.contractAPIService.searchContractNo(this.contract_no, this.keyword).subscribe((res: ContractInfo[]) => {
      this.loading = false;
      this.disabled = false;
      this.data_list = res;
      console.log("this.data_list>>> " + JSON.stringify(this.data_list));
    }, (error) => {
      this.loading = false;
      this.disabled = false;
      this.data_list = null;
      this.error = "Internal Server Error";
      console.log(error);
    });
  }

  view(contract_no, file_name) {
    this.loading = true;
    this.contractAPIService.viewAccount(contract_no, file_name).pipe(map((data: any) => {
      this.loading = false;
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(data);
      link.target = '_blank';
      link.click();
      window.URL.revokeObjectURL(link.href);
    })).subscribe(
      res => {
      },
      error => {
        this.loading = false;
        this.error = "The system cannot find the file specified";
      });
  }


}
