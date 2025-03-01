import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorCreacionDTO, ActorDTO } from './actores';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/paginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class ActoresService implements IServicioCRUD<ActorDTO, ActorCreacionDTO> {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/actores'

  public ObtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  public obtenerPorId(id: number): Observable<ActorDTO> {
    console.log('Obtener actor:', id);
    return this.http.get<ActorDTO>(`${this.urlBase}/${id}`).pipe(
      catchError(error => {
        console.error('Error en obtenerPorId:', error);
        return throwError(() => error);
      })
    );
  }

  public actualizar(id: number, actor: ActorCreacionDTO): Observable<any> {
    console.log('Actualizar actor:', id, actor);
    console.log('fecha nacimiento actor: ', actor.fechaNacimiento);
    const formData = this.construirFormData(actor);
    return this.http.put(`${this.urlBase}/${id}`, formData).pipe(
      catchError(error => {
        console.error('Error en actualizar:', error);
        return throwError(() => error);
      })
    );
  }

  public crear(actor: ActorCreacionDTO) : Observable<any>{
    const formData = this.construirFormData(actor);
    console.log('urlbase:', this.urlBase);
    console.log(formData);
  
    return this.http.post(this.urlBase, formData).pipe(
      catchError(error => {
        // Loguear el error
        console.error('Error en la creación del actor:', error);
        // Retornar el error o un observable vacío si quieres manejarlo de otra manera
        return throwError(() => error);
      })
    );
  }

  public borrar(id: number): Observable<any>{
    console.log('Borrando actores service, ', id);
    return this.http.delete(`${this.urlBase}/${id}`).pipe(
      catchError(error => {
        console.error('Error en borrar:', error);
        return throwError(() => error);
      })
    );
  }

  private construirFormData(actor: ActorCreacionDTO) {
    const formData = new FormData();

    // Añadir el campo 'nombre'
    formData.append('nombre', actor.nombre);

    // Eliminar la línea inutil de append para 'biografia'
    // formData.append('biografia', 'biografia');

    // Mejorar la lógica para la fecha de nacimiento
    if (actor.fechaNacimiento) {
        const birthDate = new Date(actor.fechaNacimiento);
        formData.append('fechaNacimiento', birthDate.toISOString().split('T')[0]);
    }

    // Añadir el campo 'foto' solo si no es nulo/undefined
    if (actor.foto) {
        formData.append('foto', actor.foto);
    }

    return formData;
}

}
