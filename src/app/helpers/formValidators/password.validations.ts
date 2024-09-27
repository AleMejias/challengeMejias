import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const  passwordMinLength = (minLength: number = 3): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    // Verifica si hay espacios en blanco
    const hasSpaces = value.trim() !== value;


    // Verifica la longitud mínima
    const isValidLength = value.length >= minLength;

    // Retorna el objeto de error si no es válido, o null si es válido
    return hasSpaces || !isValidLength ? { 'passwordMinLength': true } : null;
  };
}