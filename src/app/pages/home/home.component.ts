import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor (
    private homeService: HomeService,
    private snackbar:MatSnackBar
  ) {
    this.buscaHomes()
   }

// Função para buscar as informações e usuários

relatorio:any[] = [];

buscaHomes(){
  this.homeService.getHomes().subscribe({
    next:(resposta)=>{
      console.log(resposta);
      this.relatorio = resposta.body;
    },
    error:(erro)=>{
      console.log(erro);
    }
  })
}
}
