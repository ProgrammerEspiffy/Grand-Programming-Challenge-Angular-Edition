import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  
  //A URL 
  private url = 'http://localhost:3000/filmes'
  constructor(private http: HttpClient) { }

  //Pegar Filmes
  getFilmes(): Observable<any>{
    // Coloque Um "?_expand=nomeService" para Funcionar um id Do Produto
    return this.http.get(`${this.url}?_expand=genero`)
  }

  // Cadastrar Filmes
  postFilmes(Dados: any): Observable<any>{
    return this.http.post(`${this.url}`, Dados)
  }

  // Excluir Filmes
  deleteFilmes(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  // Editar Filmes
  putFilmes(dados: any, id: number): Observable<any>{
    return this.http.put(`${this.url}/${id}`,dados)
  }
}
