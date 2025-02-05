import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula() : ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = <string>control.value;

        if(!valor) return null;
        if(valor.length === 0) return null;

        const primeraLetra = valor[0];

        if (primeraLetra != primeraLetra.toUpperCase()) {
            return {
                primeraLetraMayuscula:{
                    mensaje: 'La primera letra debe ser mayúscula'
                }
            }
        }

        return null;
    }
}

export function fechaNoPuedeSerFutura(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fechaUsuario = new Date(control.value);
        const fechaActual = new Date();

        if (fechaUsuario > fechaActual) {
            return {
                futuro: {
                    mensaje: 'La fecha no puede ser futura'
                }   
            }
        }
        return null;
    }
}