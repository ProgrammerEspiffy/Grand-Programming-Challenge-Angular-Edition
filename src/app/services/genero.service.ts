import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private url = 'http://localhost:3000/generos'
  constructor(private http:HttpClient) { }

  // Pegar Gênero
  getGeneros(): Observable<any>{
    return this.http.get(`${this.url}`)
  }

  // Cadastrar Gênero
  postGeneros(dados: any): Observable<any>{
    return this.http.post(`${this.url}`, dados)
  }

  // Excluir Gênero
  deleteGenero(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  // Editar Gênero
  putGenero(dados: any, id: number): Observable<any>{
    return this.http.put(`${this.url}/${id}`,dados)
  }
}
