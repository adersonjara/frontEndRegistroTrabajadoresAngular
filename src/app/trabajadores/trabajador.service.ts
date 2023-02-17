import { Injectable } from '@angular/core';
import { TRABAJADORES } from './clientes.json';
import { Trabajador } from './trabajador';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable()
export class TrabajadorService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/trabajadores'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getTrabajadores(): Observable<Trabajador[]> {
  	// return of(TRABAJADORES);
  	return this.http.get(this.urlEndPoint).pipe(
  		map(response => response as Trabajador[])
  	);
  }

  create(trabajador: Trabajador) : Observable<Trabajador>{
  	return this.http.post<Trabajador>(this.urlEndPoint,trabajador,{headers: this.httpHeaders})
  }

  getTrabajador(id:any): Observable<Trabajador>{
    return this.http.get<Trabajador>(`${this.urlEndPoint}/${id}`)
  }

  update(trabajador: Trabajador): Observable<Trabajador>{
    return this.http.put<Trabajador>(`${this.urlEndPoint}/${trabajador.id}`, trabajador, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Trabajador>{
    return this.http.delete<Trabajador>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

}
