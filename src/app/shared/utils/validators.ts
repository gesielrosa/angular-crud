import {AbstractControl, ValidatorFn} from '@angular/forms';
import {validateCPF} from './functions';

export function validatorCPF(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let value: string = control.value;
    return validateCPF(value) ? null : {'invalid': true};
  };
}
