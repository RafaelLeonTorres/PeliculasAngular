import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTable, MatTableModule} from '@angular/material/table'
import { actorAutoCompleteDTO, ActorCreacionDTO } from '../actores';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-autocomplete-actores',
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule,
    DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css'
})
export class AutocompleteActoresComponent {
  control = new FormControl();

  actores: actorAutoCompleteDTO[] = [
    {
      id: 1, nombre: 'Jennifer Lynn Connelly', personaje: '', foto: 'https://image.tmdb.org/t/p/original/p17ymzw1sb9eo2SOp88jnwyryan.jpg' 
    },
    {
      id: 1, nombre: 'Rachel Anne McAdams', personaje: '', foto: 'https://fr.web.img6.acsta.net/c_300_300/medias/nmedia/18/66/15/47/18915545.jpg' 
    },
    {
      id: 1, nombre: 'Scarlett Ingrid Johansson', personaje: '', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv_ZCLLZX6ESokAwHARnUQ_FnQk38vkXJT1Q&s' 
    },
    {
      id: 1, nombre: 'Megan Denise Fox', personaje: '', foto: 'https://pics.filmaffinity.com/136957018435796-nm_200.jpg' 
    },
    {
      id: 1, nombre: 'Milica Bogdanovna Jovovich', personaje: '', foto: 'https://thumbs.dreamstime.com/z/milla-jovovich-24618275.jpg' 
    },
  ];

  @Input({required: true})
  actoresSeleccionados: actorAutoCompleteDTO[] = [];

  columnasMostradas = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<actorAutoCompleteDTO>;

  actorSeleccionado(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if(this.table != undefined){
      this.table.renderRows();
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(actor: actorAutoCompleteDTO){
    const indice = this.actoresSeleccionados.findIndex((a: actorAutoCompleteDTO) => a.id == actor.id);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

}
