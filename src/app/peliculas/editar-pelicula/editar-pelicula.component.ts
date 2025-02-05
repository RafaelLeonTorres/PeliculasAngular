import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleModel } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {
  @Input({transform: numberAttribute})
      id!: number;

  pelicula: PeliculaDTO = {
    id: 1,
    titulo : 'Your Name',
    trailer: 'https://www.youtube.com/watch?v=qz0TDMd_cB0',
    fechaLanzamiento: new Date("2016-08-26"),
    poster: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png'  
  }

  generosSeleccionados: SelectorMultipleModel[] = [
    {llave: 1, valor: 'Acción'},
  ];
  
  generosNoSeleccionados: SelectorMultipleModel[] = [
    {llave: 2, valor: 'Comedia'},
    {llave: 3, valor: 'Drama'}
  ];

  cinesSeleccionados: SelectorMultipleModel[] = [
    {llave: 1, valor: 'Cine Macabro'},
  ];
  
  cinesNoSeleccionados: SelectorMultipleModel[] = [
    {llave: 2, valor: 'Cine Gay'},
    {llave: 3, valor: 'Cine Hardcore'}
  ];

  actoresSeleccionados: actorAutoCompleteDTO[] = [
    {
      id: 1, nombre: 'Jennifer Lynn Connelly', personaje: 'Personaje', foto: 'https://image.tmdb.org/t/p/original/p17ymzw1sb9eo2SOp88jnwyryan.jpg' 
    }
  ];
  
  guardarCambios(pelicula: PeliculaCreacionDTO) {
    console.log('Editando pelicula: ', pelicula);
  }
}