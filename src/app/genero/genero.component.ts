import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  form!: FormGroup;

  cadastrar: boolean = true;

  id: number = 0;

  listaGeneros: any;
  constructor(private formBuilder: FormBuilder, private salvarGenero: GeneroService) { }

  ngOnInit(): void {
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

  //EnviarDados
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
  

  editar(item: any) {
    this.form.controls["nome"].setValue(item.nome);
    this.form.controls["email"].setValue(item.email);
    this.form.controls["telefone"].setValue(item.telefone);
    
    this.cadastrar = false
    this.id = item.id
  }

  editarDados() {
    let dados = {
      // Pegar Dados
      id: this.id,
      nome: this.form.controls["nome"].value,
      email: this.form.controls["email"].value,
      telefone: this.form.controls["telefone"].value
    }
    
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

