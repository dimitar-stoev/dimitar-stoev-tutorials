import {AbstractControl} from "@angular/forms";

export function emailValidation(control: AbstractControl): { [key: string]: boolean } | null {
  const email = control.value;
  const valid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
  if (!valid) {
    return {invalidEmail: true};
  }
  return null;
}
