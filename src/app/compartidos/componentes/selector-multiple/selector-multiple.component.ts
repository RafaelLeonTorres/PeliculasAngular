import { Component, Input } from '@angular/core';
import { SelectorMultipleModel } from './SelectorMultipleModelo';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-selector-multiple',
  imports: [MatIconModule],
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.css'
})
export class SelectorMultipleComponent {

  @Input({required: true})
  Seleccionados!: SelectorMultipleModel[];

  @Input({required: true})
  NoSeleccionados!: SelectorMultipleModel[];

  seleccionar(elemento: SelectorMultipleModel, indice: number) {
    this.Seleccionados.push(elemento);
    this.NoSeleccionados.splice(indice, 1);
  }

  deseleccionar(elemento: SelectorMultipleModel, indice: number) {
    this.NoSeleccionados.push(elemento);
    this.Seleccionados.splice(indice, 1);
  }

  seleccionarTodo(){
    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados = [];
  }

  deseleccionarTodo(){
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados = [];
  }
}
