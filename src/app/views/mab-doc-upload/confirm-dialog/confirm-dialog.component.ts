import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocCategory } from 'src/models/DocCategory';
import { DocUploadService } from 'src/services/DocUploadService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocSearchData } from 'src/models/DocSearchData';

@Component({
  selector: 'app-mab-doc-upload-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title?:string;
  bodyMessage?:string;
  @Output() status: EventEmitter<any> = new EventEmitter();

    constructor(
    public activeModal: NgbActiveModal,
    private service:DocUploadService
    ) {

    }

    cancel(): void {
      this.status.emit("cancel");
      this.activeModal.dismiss();
    }
  
    ok(): void {
      this.status.emit("ok");
      this.activeModal.dismiss();
    }

    
}
