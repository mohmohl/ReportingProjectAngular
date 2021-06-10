import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { LoanContractService } from 'src/services/LoanContractService';

import { TwoDimensional } from 'src/models/TwoDimensional';
import { ExportDataService } from 'src/services/ExportDataService';
import { TransactionService } from 'src/services/TransactionService';
import * as XLSX from 'xlsx';
import * as fs from 'file-saver';
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

  form = new FormGroup({
    contractno: new FormControl(''),
    keyword: new FormControl('')
  });

  public data_list: ContractInfo[] = null;


  constructor(private contractAPIService: LoanContractService, private apiService: TransactionService, private exporter: ExportDataService) { }

  ngOnInit() {
  }

  submit() {
    this.error = "";
    this.contract_no = this.form.get(["contractno"])!.value;
    this.keyword = this.form.get(["keyword"])!.value;
    this.loading = true;
    console.log("Param = " + this.contract_no)
    this.contractAPIService.searchContractNo(this.contract_no, this.keyword).subscribe((res: ContractInfo[]) => {
      this.loading = false;
      this.data_list = res;
      console.log("this.data_list>>> " + JSON.stringify(this.data_list));
    }, (error) => {
      this.data_list = null;
      this.loading = false;
      this.error = "Internal Server Error";
      console.log(error);
    });
  }

  view(contract_no, file_name) {
    this.contractAPIService.viewAccount(contract_no, file_name)
      .pipe(
        map((data: any) => {
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(data);
          link.target = '_blank';
          link.click();
          window.URL.revokeObjectURL(link.href);
          this.loading = false;
        })).subscribe(
          res => {
          },
          error => {
            this.error = "(The system cannot find the file specified)";
            this.loading = false;
          });
  }


}
