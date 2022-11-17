import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FilmesService } from '../services/filmes.service';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  // Váriáveis

  form!: FormGroup;

  listaFilmes: any;
  listaGeneros: any;

  cadastrar: boolean = true;

  id: number = 0;

  constructor(private formBuilder: FormBuilder, private salvarFilmes: FilmesService, private salvarGenero: GeneroService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nomeFilmes: new FormControl(''),
      nomeGenero: new FormControl(0)
    })
    this.form.valueChanges.subscribe(console.log);
  
    this.seeMovie();
    this.pegaGenero();
  }

  //Ler Filmes
  seeMovie() {
    this.salvarFilmes.getFilmes().subscribe({
      next: (dados: any) => {
        this.listaFilmes = dados

        console.log(this.listaFilmes);
      },
      error: (erro) => {
        console.log(erro);        
      }
    })
  }

  
  //Ler Gênero
  pegaGenero() {
    this.salvarGenero.getGeneros().subscribe({
      next: (dados: any) => {
        this.listaGeneros = dados

        console.log(this.listaGeneros);
      },
      error: (erro) => {
        console.log(erro);
      }

    })
  }

  Enviardados() {
    let dados = {
      //Pegar Daddos
      id: this.listaFilmes[this.listaFilmes.length - 1].id + 1,
      nomeFilmes: this.form.controls["nomeFilmes"].value,
      generoId: parseInt(this.form.controls["nomeGenero"].value)
    }

    //Colocar Dados
    this.salvarFilmes.postFilmes(dados).subscribe({
      next: (dados) => {
        console.log(dados);
        this.seeMovie();
      },
      error: (erro) =>  {
        console.log("Erro ao Salvar\n" + erro);
      }
    })
  }

  excluirDados(id: number) {
    this.salvarFilmes.deleteFilmes(id).subscribe({
      next: (dados) => {
        console.log(dados);
        this.seeMovie();
      },
      error: (erro) => {
        console.log("Erro ao Excluir\n" + erro);
        
      }
    })
  }
  

  editar(item: any) {
    this.form.controls["nomeFilmes"].setValue(item.nomeFilmes);
    this.form.controls["nomeGenero"].setValue(item.nomeGenero);

    this.cadastrar = false
    this.id = item.id
  }

  Editardados() {
    let dados = {
      // Pegar Dados
      id: this.id,
      nomeFilmes: this.form.controls["nomeFilmes"].value,
      generoId: parseInt(this.form.controls["nomeGenero"].value)

    }
    
    this.salvarFilmes.putFilmes(dados, this.id).subscribe({
      next: (dados) => {
        console.log(dados);
        this.seeMovie();
        
      },
      error: (erro) => {
        console.log("Erro ao  Editar\n" + erro);
      }
    })
    this.cadastrar = true
  }

}