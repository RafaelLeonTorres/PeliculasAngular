import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { GenerosService } from '../generos.service';
import { GeneroDTO } from '../generos';
import { MatTableModule } from '@angular/material/table';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/modelos/paginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-generos',
  imports: [RouterLink, MatButtonModule, MatTableModule, ListadoGenericoComponent, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {
  generosService = inject(GenerosService);
  generos!: GeneroDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  registrosPagina = 10;
  paginacion: PaginacionDTO = {pagina: 1, registrosPorPagina: this.registrosPagina};
  cantidadTotalRegistros!: number;

  constructor(){
    this.CargarRegistros();
  }

  CargarRegistros(){
    this.generosService.ObtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<GeneroDTO[]>) => {
      this.generos = respuesta.body as GeneroDTO[];
      const cabecera = respuesta.headers.get('cantidad-total-reistros') as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = {pagina: datos.pageIndex + 1, registrosPorPagina: datos.pageSize};
    this.CargarRegistros();
  }

  borrar(genero: GeneroDTO){
    console.log('indice generos borrar: ', genero.id);
    this.generosService.borrar(genero.id)
      .subscribe(() => {
        this.paginacion = {pagina: 1, registrosPorPagina: this.registrosPagina};
        this.CargarRegistros();
        alert('Se ha borrado con éxito el genero: ' + genero.nombre);
      },
        (error) => {
        console.log('Error al borrar el genero: ', error);
      }
    );
  }
}
