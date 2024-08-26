import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../services/cadastro.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  constructor (
    private cadastroService: CadastroService,
    private snackbar:MatSnackBar
  ) {
    this.buscaCadastros()
   }

  

//Iniciaçiza o formulário
formulario:FormGroup = new FormGroup({
  id:new FormControl(null),
  apelido:new FormControl('',Validators.required),
  num_linhas:new FormControl('',Validators.required),
 num_colunas:new FormControl('',Validators.required)
})

 //Métados dos controles do formulário
 onIncluir(){
  this.formulario.reset();
  this.formulario.enable();
}

onSalvar(){
  //Guarda as informções em uma variável pra melhorar o acesso
  let info = this.formulario.value;
  //Verifica se está inserindo ou alterando com baso no valor
  //do ID (se for null, está inserindo, senão está alterando)
  if(info.id == null){
  //Irá inserir no banco de dados um usuário
  this.cadastroService.addCadastro(info).subscribe({
    next:(resposta)=>{
      console.log(resposta);
      this.snackbar.open(
        "Cadastro adicionado com sucesso!",
        "OK",
        {
          verticalPosition:'top',
          horizontalPosition:'end',
          duration:3000
        }
      )
      this.onCancelar()
    },
    error:(erro)=>{
      console.log(erro);
      this.snackbar.open(
        "Oh não, aconteceu algo de errado!",
        "OK",
        {
          verticalPosition:'top',
          horizontalPosition:'end',
          duration:3000
        }
      )
    }
  })
  }else{
  //Irá alterar o usuário no banco de dados
  }
}

onCancelar(){
  this.formulario.reset();
  this.formulario.disable();
}

// Função para buscar as informações e usuários

relatorio:any[] = [];

buscaCadastros(){
  this.cadastroService.getCadastros().subscribe({
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
