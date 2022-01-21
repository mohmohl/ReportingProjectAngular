import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackDateReportService } from 'src/services/BackDateReportService';

@Component({
  selector: 'app-search-pdf-report',
  templateUrl: './search-pdf-report.component.html',
  styleUrls: ['./search-pdf-report.component.css']
})
export class SearchPdfReportComponent implements OnInit {
  paramId:any;
  branch_list:string[];
  constructor(private route: ActivatedRoute,private bdService:BackDateReportService) { }

  ngOnInit() {
    this.paramId = this.route.snapshot.data
    this.bdService.getBranchList().subscribe(res =>{
    this.branch_list=res;
    });
    
  }

}
