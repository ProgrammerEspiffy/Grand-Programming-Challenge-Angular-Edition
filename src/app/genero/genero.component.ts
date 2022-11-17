import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  // Váriaveis
  form!: FormGroup;
  cadastrar: boolean = true;
  id: number = 0;

  listaGeneros: any;
  constructor(private formBuilder: FormBuilder, private salvarGenero: GeneroService) { }

  ngOnInit(): void {
    // Pegar O Form do Gênero
    this.form = this.formBuilder.group({
      Genero: new FormControl('')

    })
    this.form.valueChanges.subscribe(console.log);

    this.watchGenero();
  }

  //ler nome do Gênero
  watchGenero() {
    this.salvarGenero.getGeneros().subscribe({
      next:(dados: any) => {
        this.listaGeneros = dados

        console.log(this.listaGeneros);
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  //Enviar os Dados do Cadastro
  Enviardados(){
    let dados = {
      //Pegar Dados
      id: this.listaGeneros[this.listaGeneros.length - 1].id + 1,
      nomeGenero: this.form.controls["Genero"].value
    }
  
    //Colocar  dados Na API
    this.salvarGenero.postGeneros(dados).subscribe({
      next: (dados) => {
        console.log(dados);
        this.watchGenero();
      },
      error: (erro) => {
        console.log("Erro ao Salvar\n" + erro);
        
      }
    })
  }

    // Excluir os Dados
  excluirDados(id: number) {
    this.salvarGenero.deleteGenero(id).subscribe({
      next: (dados) => {
        console.log(dados);
        this.watchGenero();
      },
      error: (erro) => {
        console.log("Erro ao Excluir\n" + erro);
        
      }
    })
  }
  
    // Que Vai Fazer a Edição da base de Dados
  editar(item: any) {
    this.form.controls["Genero"].setValue(item.nomeGenero);
    
    this.cadastrar = false
    this.id = item.id
  }

    // "Editardados" vai Enviar Pra Mock API
  editarDados() {
    let dados = {
      // Pegar Dados
      id: this.id,
      nome: this.form.controls["Genero"].value,
    }
      // Vai Fazer A Edição
    this.salvarGenero.putGenero(dados, this.id).subscribe({
      next: (dados) => {
        console.log(dados);
        this.watchGenero();
        
      },
      error: (erro) => {
        console.log("Erro ao  Editar\n" + erro);
      }
    })
    this.cadastrar = true
  }

}

