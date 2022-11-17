import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  private url = 'http://localhost:3000/filmes?_expand=genero'
  constructor(private http: HttpClient) { }

  //Pegar Filmes
  getFilmes(): Observable<any>{
    return this.http.get(`${this.url}`)
  }

  postFilmes(Dados: any): Observable<any>{
    return this.http.post(`${this.url}`, Dados)
  }

  deleteFilmes(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  putFilmes(dados: any, id: number): Observable<any>{
    return this.http.put(`${this.url}/${id}`,dados)
  }
}
