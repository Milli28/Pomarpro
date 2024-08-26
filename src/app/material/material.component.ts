import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from '../services/material.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent {

  constructor (
    private materialService: MaterialService,
    private snackbar:MatSnackBar
  ) {
    this.buscaMateriais()
   }

  

//Iniciaçiza o formulário
formulario:FormGroup = new FormGroup({
  id:new FormControl(null),
  nome:new FormControl('',Validators.required),
  valor:new FormControl('',Validators.required),
  fornecedor:new FormControl('',Validators.required),
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
  this.materialService.addMaterial(info).subscribe({
    next:(resposta)=>{
      console.log(resposta);
      this.snackbar.open(
        "Material adicionado com sucesso!",
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

buscaMateriais(){
  this.materialService.getMateriais().subscribe({
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