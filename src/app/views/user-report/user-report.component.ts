import { Component, OnInit } from '@angular/core';
import { TwoDimensional } from 'src/models/TwoDimensional';
import { ExportDataService } from 'src/services/ExportDataService';
import { TransactionService } from 'src/services/TransactionService';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  loading=false;
  error='';
 public col_list : String[] = null;
  public data_list : TwoDimensional[]=null;
  public startCount:number=0;

  constructor(private apiservice:TransactionService, private exporter : ExportDataService) { }

  ngOnInit(): void {
    this.loading=true;
    
    this.error='';
    
  }

}
