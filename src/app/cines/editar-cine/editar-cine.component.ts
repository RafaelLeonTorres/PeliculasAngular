import { Component, Input, numberAttribute } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";

@Component({
  selector: 'app-editar-cine',
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent {
   @Input({transform: numberAttribute})
    id!: number;

    cine: CineDTO = {id: 1, nombre: 'Cine Macabro', latitud: 20.57505835000566, longitud: -101.19230491930809}

    guardarCambios(cine: CineCreacionDTO){
      console.log('editar cine ', cine);
    }
}
