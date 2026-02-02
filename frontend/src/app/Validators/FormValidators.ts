import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidators {

  // Cambiamos ValidationErrors | null por ValidatorFn
  static notOnlyWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length == 0)) {
      return { notOnlyWhiteSpace: true };
    } else {
      return null;
    }
  }

  // AQUÍ ESTABA EL ERROR PRINCIPAL
  // Antes: static forbiddenName(text: string[]): ValidationErrors
  // Ahora: static forbiddenName(text: string[]): ValidatorFn
  static forbiddenName(text: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let result = null;
      text.forEach(p => {
        const regExp = new RegExp(p, 'i');
        const forbidden = regExp.test(control.value);
        if (forbidden) result = { forbiddenName: { value: control.value } };
      });
      return result;
    };
  }

  // Igual aquí, debe devolver ValidatorFn
  static minValue(value: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Añadimos comprobación de null para evitar errores si el campo está vacío
      if (!control.value) return null;
      if (control.value < value) return { minValue: true };
      else return null;
    };
  }

  // Y aquí también
  static allowedExtension(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // Si está vacío no validamos extensión aún (eso lo hace el required)
      const allowed = regex.test(control.value);
      return allowed ? null : { allowedExtension: true };
    };
  }
}
