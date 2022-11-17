import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalvarDadosService {
  private url = 'http://localhost:3000/usuarios'

  //O que meu Componente precisa
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any>{
   return this.http.get(`${this.url}`)
  }

  postUsuarios(dados: any): Observable<any>{
    return this.http.post(`${this.url}`, dados)
  }

  deleteUsuarios(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  putUsuarios(dados: any, id: number): Observable<any>{
    return this.http.put(`${this.url}/${id}`,dados)
  }
}


