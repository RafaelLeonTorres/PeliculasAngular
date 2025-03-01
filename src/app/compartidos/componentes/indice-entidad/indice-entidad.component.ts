import { Component, inject, Inject, Input } from '@angular/core';
import { PaginacionDTO } from '../../modelos/paginacionDTO';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListadoGenericoComponent } from "../listado-generico/listado-generico.component";
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';

@Component({
  selector: 'app-indice-entidad',
  imports: [RouterLink, MatButtonModule, MatTableModule, ListadoGenericoComponent, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.css'
})
export class IndiceEntidadComponent<TDTO, TCreacionDTO> {

  constructor(){
    this.CargarRegistros();
  }

  @Input({required: true})
  titulo!: string;
  
  @Input({required: true})
  rutaCrear!: string;

  @Input({required: true})
  rutaEditar!: string;

  @Input()
  columnasAMostrar = ['id', 'nombre', 'acciones'];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TDTO, TCreacionDTO>;

  paginacion: PaginacionDTO = {pagina: 1, registrosPorPagina: 10};
  cantidadTotalRegistros!: number;
  entidades!: TDTO[];

  CargarRegistros(){
      this.servicioCRUD.ObtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<TDTO[]>) => {
        this.entidades = respuesta.body as TDTO[];
        const cabecera = respuesta.headers.get('cantidad-total-registros') as string;
        this.cantidadTotalRegistros = parseInt(cabecera, 10);
        console.log('Cantidad registros: ' + this.cantidadTotalRegistros);
    })
  }

  actualizarPaginacion(datos: PageEvent){
      this.paginacion = {pagina: datos.pageIndex + 1, registrosPorPagina: datos.pageSize};
      this.CargarRegistros();
  }

  borrar(id: number){
    console.log('indice generos borrar: ', id);
    this.servicioCRUD.borrar(id)
      .subscribe(() => {
        this.paginacion.pagina = 1;
        this.CargarRegistros();
      },
        (error: any) => {
        console.log('Error al borrar el genero: ', error);
      }
    );
  }

  primeraLetraMayuscula(valor: string){
    if(!valor) return valor;
    return valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
  }
}
