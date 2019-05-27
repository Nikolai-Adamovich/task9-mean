import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true }]
})
export class ForbiddenNameDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
      return (): { [key: string]: any } | null => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? { forbiddenName: { value: control.value } } : null;
      };
    }

    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
      : null;
  }
}
