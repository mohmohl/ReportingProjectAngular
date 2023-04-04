import { Component, Output, EventEmitter, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-excel-column-adding',
  templateUrl: './excel-column-adding.component.html',
  styleUrls: ['./excel-column-adding.component.css'],
})
export class ExcelColumnAddingComponent implements OnInit, AfterViewInit {
  editForm = this.fb.group({
    separator: [{ value: '', disabled: true }],
    fieldList: this.fb.array([]),
  });

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  @ViewChildren('colNoInputs') colInputs:  QueryList<ElementRef>;


  separatorList = [
    {"value":"empty","caption":"Empty Between ()"},
    {"value":"space","caption":"Space Between ( )"},
    {"value":"slad","caption":"Slad Between (/)"},
    {"value":"comma","caption":"Comma Between (,)"}
  ];


  constructor(
    public activeModal: NgbActiveModal,
    protected fb: FormBuilder,
    private cdr: ChangeDetectorRef
    ) {

    }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.addField();
    this.cdr.detectChanges();
  }

  cancel(): void {
    this.activeModal.dismiss();
  }


  add(): void {
    let cols =[];

    this.fieldList().controls.forEach(data => {
      cols.push(data.get(['colNo'])!.value);
    }); 

    this.passEntry.emit({separator: this.editForm.get(['separator'])!.value, cols: cols});
    this.activeModal.dismiss();
  }

  fieldList(): FormArray {
    return this.editForm.get('fieldList') as FormArray;
  }

  newField(): FormGroup {
    return this.fb.group({
      colNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  addField(): void {
    this.fieldList().push(this.newField());
    this.colInputs.changes.pipe(take(1)).subscribe({
      next: changes => changes.last.nativeElement.focus()
    }) 
    if(this.fieldList().length >1){
      this.editForm.get('separator').enable({ onlySelf: true });
    }else{
      this.editForm.get('separator').disable({ onlySelf: true });
    }
    
  }

  removeField(i: number): void {
    if (this.fieldList().length > 1) {
      this.fieldList().removeAt(i);
    }
    if(this.fieldList().length >1){
      this.editForm.get('separator').enable({ onlySelf: true });
    }else{
      this.editForm.get('separator').disable({ onlySelf: true });
    }
  }

  removeAllField(): void {
    this.fieldList().clear();
    this.editForm.get('separator').disable({ onlySelf: true });
  }


  validateNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  
  
}
