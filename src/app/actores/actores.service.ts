import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorCreacionDTO, ActorDTO } from './actores';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/paginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/actores'

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  public crear(actor: ActorCreacionDTO) {
    const formData = this.construirFormData(actor);
    console.log('urlbase:', this.urlBase);

    console.log(formData);
  
    return this.http.post(this.urlBase, formData).pipe(
      catchError(error => {
        // Loguear el error
        console.error('Error en la creación del actor:', error);
        // Retornar el error o un observable vacío si quieres manejarlo de otra manera
        return throwError(error);
      })
    );
  }

  private construirFormData(actor: ActorCreacionDTO){
    const formData = new FormData();

    formData.append('nombre', actor.nombre);

    //formData.append('biografia', 'biografia');

    //2024-01-25T15:18:20 solo toma la fecha sin la hora
    formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]);

    if(actor.foto){
      formData.append('foto', actor.foto);
    }

    return formData;
      
  }
}
