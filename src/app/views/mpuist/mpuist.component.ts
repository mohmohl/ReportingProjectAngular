import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomComboValidator} from './custom-combo.validator';
import { MPUISTService } from '../../../services/MPUISTService';
import { MPUDataValidateImportResponse} from '../../../models/MPUDataValidateImportResponse';
import { MPUDataValidatePreviewResponse } from 'src/models/MPUDataValidatePreviewResponse';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-mpuist',
  templateUrl: './mpuist.component.html',
  styleUrls: ['./mpuist.component.css']
})
export class MpuistComponent implements OnInit {

  deviceSmall=458;
  scrHeight:Number;
  scrWidth:Number;

  mpuform = null;
  fileTypeList:string[]=['Select File Type','INC_01C','INC_01R','INC_01S','INC_11C','INC_11S','IND_01ACOM','IND_01ICOM','IND_01IERR','IND_01SCOM'];
  fileValid:Boolean=false;
  previewTitle:String='';
  previewFileName:String='';
  previewData:MPUDataValidatePreviewResponse=new MPUDataValidatePreviewResponse();
  showPreview:Boolean=false;
  message:String=null;
  success:Boolean=false;

  public startCount:number=0;

  constructor(private service:MPUISTService) { }

  ngOnInit() {
    this.mpuform = new FormGroup({
      uploadfile: new FormControl('', Validators.required),
      fileType: new FormControl('Select File Type',[Validators.required,CustomComboValidator.selectSomething]),
      fileSource: new FormControl('', [Validators.required])
    });
  }

  onFileTypeChange(event) {
    this.fileValid=false;
  }

  onFileChange(event) {
    this.fileValid=false;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.mpuform.patchValue({
        fileSource: file
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
}

  submit(){
    var buttonName = document.activeElement.getAttribute("Name");

    if(buttonName==='validate'){
      this.showPreview=false;
      const formData = new FormData(); 
      formData.append('uploadedFile', this.mpuform.get('fileSource').value);
      formData.append('filetype', this.mpuform.get('fileType').value); 

        this.service.validateFile(formData).subscribe((res:MPUDataValidateImportResponse)=>{
         this.fileValid=res.valid;
         this.message=res.message;
         this.success=res.valid;
        },
        (err)=>{
          console.log(err)
          this.fileValid=false;
        }
      );
    }else if(buttonName==='preview'){
      this.startCount=0;
      const formData = new FormData(); 
      const file=this.mpuform.get('fileSource').value;
      const filetype=this.mpuform.get('fileType').value;
      this.previewData=new MPUDataValidatePreviewResponse();
      formData.append('uploadedFile',file);
      formData.append('filetype', filetype); 
      
      this.service.previewFile(formData,filetype).subscribe((res:MPUDataValidatePreviewResponse)=>{
         this.fileValid=res.valid;
         this.success=res.valid;
         if(res.valid){
           switch(filetype){
             case 'INC_01C':{
              this.previewTitle='Acquire POS Settlement Details';
              break;
             }
             case 'INC_01R':{
              this.previewTitle='Acquire POS Reject Details';
              break;
             }
             case 'INC_01S':{
              this.previewTitle='Acquire POS Settlement Summary';
              break;
             }
             case 'INC_11C':{
              this.previewTitle='Issuer POS Settlement Details';
              break;
             }
             case 'INC_11S':{
              this.previewTitle='Issuer POS Settlement Summary';
              break;
             }
             case 'IND_01ACOM':{
              this.previewTitle='Acquire ATM Detail Report';
              break;
             }
             case 'IND_01ICOM':{
              this.previewTitle='Issuer ATM Detail Report';
              break;
             }
             case 'IND_01IERR':{
              this.previewTitle='Issuer ATM Error Report';
              break;
             }
             case'IND_01SCOM':{
              this.previewTitle='ATM Summary';
              break;
             }
           }
           this.showPreview=true;
           this.previewFileName=file.name;
           this.previewData=res;
         }else{
          this.message="File is invalid or damaged";
         }
        },
        (err)=>{
          this.fileValid=false;
          console.log(err);
        }
      );
    }else if(buttonName==='save'){
      this.showPreview=false;
      const formData = new FormData(); 
      formData.append('uploadedFile', this.mpuform.get('fileSource').value);
      formData.append('filetype', this.mpuform.get('fileType').value); 
      this.service.saveFile(formData).subscribe((res:MPUDataValidateImportResponse)=>{
        this.message=res.message;
        if(res.valid && res.success){
          this.success=true;
        }else{
          this.success=false;
        }
        this.fileValid=false;
      },
      (err)=>{
        console.log(err);
        this.fileValid=false;
      });
    }
    
  }
}
