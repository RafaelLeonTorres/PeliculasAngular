import { Component } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { GenerosService } from '../generos.service';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";

@Component({
  selector: 'app-indice-generos',
  imports: [IndiceEntidadComponent],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: GenerosService}
  ]
})
export class IndiceGenerosComponent {

}
