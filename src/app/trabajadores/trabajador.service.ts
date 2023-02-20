import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { TRABAJADORES } from './trabajadores.json';
import { Trabajador } from './trabajador';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable()
export class TrabajadorService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/trabajadores'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router ) { }

  getTrabajadores(): Observable<Trabajador[]> {
  	// return of(TRABAJADORES);
  	return this.http.get(this.urlEndPoint).pipe(
  		map( (response:any) => {
          let trabajadores = response.data as Trabajador[];
          return trabajadores.map(trabajador => {
            trabajador.nombres = trabajador.nombres.toUpperCase();
            trabajador.apellidos = trabajador.apellidos.toUpperCase();
            
            trabajador.createAt = formatDate(trabajador.createAt, 'EEEE dd, MMMM yyyy', 'es');
            return trabajador;
          })
        }
      )
  	);
  }

  create(trabajador: Trabajador) : Observable<any>{
  	return this.http.post<any>(this.urlEndPoint,trabajador,{headers: this.httpHeaders}).pipe(
      catchError(e => {

          if (e.status == 400) {
            return throwError(e);
          }

          swal.fire(e.error.mensaje,'','error');
          return throwError(e);
      })
    );
  }

  getTrabajador(id:any): Observable<Trabajador>{
    return this.http.get<Trabajador>(`${this.urlEndPoint}/${id}`).pipe(
      map((res:any) => res.data as Trabajador),
      catchError(e => {
          this.router.navigate(['/trabajadores']);
          //console.log(e.error);
          swal.fire('Error al editar', e.error.mensaje,'error');
          return throwError(e);
      })
    );
  }

  update(trabajador: Trabajador): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${trabajador.id}`, trabajador, {headers: this.httpHeaders}).pipe(
      catchError(e => {
          if (e.error.status == 400) {
            return throwError(e);
          }
          // swal.fire(e.error.mensaje,e.error.error,'error');
          return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
          swal.fire(e.error.mensaje,e.error.error,'error');
          return throwError(e);
      })
    );
  }

}
