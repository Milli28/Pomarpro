import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {

  constructor (
    private produtoService: ProdutoService,
    private snackbar:MatSnackBar
  ) {
    this.buscaProdutos()
   }

  

//Iniciaçiza o formulário
formulario:FormGroup = new FormGroup({
  id:new FormControl(null),
  descricao:new FormControl('',Validators.required),
  unidade_medida:new FormControl('',Validators.required),
  valor:new FormControl('',Validators.required),
  tipo:new FormControl('',Validators.required)
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
  this.produtoService.addProduto(info).subscribe({
    next:(resposta)=>{
      console.log(resposta);
      this.snackbar.open(
        "Produto adicionado com sucesso!",
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

buscaProdutos(){
  this.produtoService.getProdutos().subscribe({
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
