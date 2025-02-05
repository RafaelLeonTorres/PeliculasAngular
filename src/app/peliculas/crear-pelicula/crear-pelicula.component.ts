import { Component } from '@angular/core';
import { PeliculaCreacionDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleModel } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-crear-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {

  generosSeleccionados: SelectorMultipleModel[] = [];

  generosNoSeleccionados: SelectorMultipleModel[] = [
    {llave: 1, valor: 'Acción'},
    {llave: 2, valor: 'Comedia'},
    {llave: 3, valor: 'Drama'}
  ];

  cinesSeleccionados: SelectorMultipleModel[] = [];

  cinesNoSeleccionados: SelectorMultipleModel[] = [
    {llave: 1, valor: 'Cine 1'},
    {llave: 2, valor: 'Cine 2'},
    {llave: 3, valor: 'Cine 3'}
  ];

  actoresSeleccionados: actorAutoCompleteDTO[] = [];

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('Creado la pelicula: ', pelicula);
  }
}
