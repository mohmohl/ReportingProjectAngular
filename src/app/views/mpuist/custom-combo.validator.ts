import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomComboValidator {
    static selectSomething(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string)==='Select File Type'){
            return {selectSomething: true}
        }
        return null;
    }
}