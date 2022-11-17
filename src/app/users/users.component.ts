import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalvarDadosService } from '../services/salvar-dados.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // Váriáveis
  
  form!: FormGroup;

  listaUsers: any;

  cadastrar: boolean = true;

  id: number = 0;

  constructor(private formBuilder: FormBuilder, private salvarDados: SalvarDadosService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl('')
    })

    this.readUsers();
  }

  //Ler Usuarios
  readUsers() {
    this.salvarDados.getUsuarios().subscribe({
      next: (dados: any) => {
        this.listaUsers = dados

        console.log(this.listaUsers);
        
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  //Enviar os Dados do Usuário

  enviarDados() {
    let dados = {
      // Pegar Dados
      id: this.listaUsers[this.listaUsers.length - 1].id + 1,
      nome: this.form.controls["nome"].value,
      email: this.form.controls["email"].value,
      telefone: this.form.controls["telefone"].value
    }

    //Colocar Dados no "Service"
    this.salvarDados.postUsuarios(dados).subscribe({
      next: (dados) => {
        console.log(dados);
        this.readUsers();
      },
      error: (erro) => {
        console.log("Erro ao cadastrar\n" + erro);
        
      }
    })
  }

  excluirDados(id: number) {
    this.salvarDados.deleteUsuarios(id).subscribe({
      next: (dados) => {
        console.log(dados);
        this.readUsers();
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
    
    this.salvarDados.putUsuarios(dados, this.id).subscribe({
      next: (dados) => {
        console.log(dados);
        this.readUsers();
        
      },
      error: (erro) => {
        console.log("Erro ao  Editar\n" + erro);
      }
    })
    this.cadastrar = true
  }

  
  

}