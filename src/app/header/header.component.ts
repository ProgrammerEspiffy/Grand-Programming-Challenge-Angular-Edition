import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  frase:string = ''

  constructor(private router:Router) { }

  ngOnInit(): void {
    if (this.router.url === '/main') {
      this.frase = 'Conheça nossa Coletânea'
    }
    else if(this.router.url === '/users'){
      this.frase = 'Faça o Cadastro de usuários e  edite, caso necessário Pronto para cadastrar? '
    }
    else if(this.router.url === '/filmes'){
      this.frase = 'Cadastre os filmes de sua preferência '
    }
    else if(this.router.url === '/genero'){
      this.frase = 'Cadastre os gêneros dos filmes'
    }
  }

}
