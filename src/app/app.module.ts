import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FilmesComponent } from './filmes/filmes.component';
import { FooterComponent } from './footer/footer.component';
import { GeneroComponent } from './genero/genero.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    HeaderComponent,
    FilmesComponent,
    FooterComponent,
    GeneroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
