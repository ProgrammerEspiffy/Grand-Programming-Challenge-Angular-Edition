import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private url = 'http://localhost:3000/generos'
  constructor(private http:HttpClient) { }

  getGeneros(): Observable<any>{
    return this.http.get(`${this.url}`)
  }

  postGeneros(dados: any): Observable<any>{
    return this.http.post(`${this.url}`, dados)
  }

  deleteGenero(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  putGenero(dados: any, id: number): Observable<any>{
    return this.http.put(`${this.url}/${id}`,dados)
  }
}
