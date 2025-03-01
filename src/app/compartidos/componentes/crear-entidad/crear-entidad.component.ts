import { formatCurrency } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { Router, RouterLink } from '@angular/router';
import { extraerErrores } from '../../funciones/extraerErrores';
import { MostrarErroresComponent } from "../mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-entidad',
  imports: [RouterLink, MostrarErroresComponent],
  templateUrl: './crear-entidad.component.html',
  styleUrl: './crear-entidad.component.css'
})
export class CrearEntidadComponent<TDTO, TCreacionDTO> implements AfterViewInit{
  ngAfterViewInit(): void {
    this.componenteRef = this.contenedorFormulario.createComponent(this.formulario);
    this.componenteRef.instance.posteoFormulario.subscribe((entidad: any) => {
      this.guardarCambios(entidad);
    })
  }
  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaIndice!: string;

  @Input({required: true})
  formulario: any;

  errores: string[] = [];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as  IServicioCRUD<TDTO, TCreacionDTO>;

  private router = inject(Router);

  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;

  private componenteRef!: ComponentRef<any>;

  guardarCambios(entidad: TCreacionDTO){
      // .. guardar los cambios
      this.servicioCRUD.crear(entidad).subscribe({
        next : () => {
          this.router.navigate(['/generos']);
        },
        error: err => {
          const errores = extraerErrores(err);
          this.errores = errores;
        }       
      })
    }
}
