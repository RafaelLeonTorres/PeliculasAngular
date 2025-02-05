import { Component, Input, numberAttribute } from '@angular/core';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import moment from 'moment';

@Component({
  selector: 'app-editar-actor',
  imports: [FormularioActoresComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent {
  @Input({transform: numberAttribute})
  id!: number;

  actor: ActorDTO = {id: 1, nombre: 'Tom Holland', fechaNacimiento: new Date('1991-01-25'), foto: 'https://mx.web.img2.acsta.net/pictures/23/05/30/13/16/0004762.jpg'}

  guardarCambios(actor: ActorCreacionDTO){
    actor.fechaNacimiento = moment(actor.fechaNacimiento).toDate();
    console.log('editando el actor ', actor);
  }

}
