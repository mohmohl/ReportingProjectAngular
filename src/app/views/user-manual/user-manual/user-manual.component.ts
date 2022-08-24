import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserManualService } from 'src/services/UserManualService';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.css']
})
export class UserManualComponent implements OnInit {

  error = '';
  loading = false;
  fileList: any=[];
  valid: boolean = false;
  validTime; 


  constructor(private service:UserManualService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.loading = true;
    this.service.getFileList().subscribe(res =>{
      this.loading = false;
        if(res){
        this.fileList = res;
        }
      });

      setInterval(() => {
        this.validTime = this.datepipe.transform(new Date(), 'HH:mm');
       // console.log("Time: " + this.validTime);
        this.valid = false;
       // console.log("Flag: " + this.valid);
        if(this.validTime >= '17:02') {
          this.valid = true;
        }
      }, 1000)
  
  }

  submit(id: string,fileType: string,fullPath: string,fileName: string) {
    var fileExtenstion = fullPath.substring(fullPath.lastIndexOf('.'));

    this.loading = true;
    this.error = "";
    var appfiletype = "";
    if(fileType ==="excel"){
      appfiletype = "application/vnd.ms-excel";
    }
    else if(fileType ==="pdf"){
      appfiletype = "application/pdf";
    } else {
      appfiletype = "application/video";
    }
    
    this.service.searchManualFile(id,fileType).pipe(
        map((data: any) => {
          let blob = new Blob([data], {
            type: appfiletype
          });
          
          if(fileType ==="excel"){
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName+ '.xlsx';
            link.click();
            window.URL.revokeObjectURL(link.href);
            }else if(fileType ==="pdf"){
              var a = document.createElement("a");
              document.body.appendChild(a);
              var file = new Blob([data], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              a.href = fileURL;
              a.download = fileName +'.pdf';
              a.target     = '_blank'; 
              a.click();
            } else {
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName + fileExtenstion;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          this.loading = false;
        })).subscribe(
          res => {

          },
          error => {
            this.error =  "(The system cannot find the file specified)";
            this.loading = false;
          });
  }
  
}
