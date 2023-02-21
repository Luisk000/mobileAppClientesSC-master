import { LojaService } from './../services/loja.service';
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
import { UsuarioService } from './../services/usuario.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Cliente } from '../model/cliente.models';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss'],
})
export class EditarusuarioComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private lojaService: LojaService
  ) {}

  users: User[];
  clientes: Cliente[];
  carregando = false;

  ngOnInit() {
    this.usuarioService
      .getUsers()
      .subscribe((users) => {
        this.users = users;
        this.lojaService
          .getLoja()
          .subscribe((clientes) => {
            this.clientes = clientes;
            console.log(this.clientes);
          });
      });
  }

  changeUser(user: User) {
    this.carregando = true;
    this.usuarioService.changeUser(user.cpf).subscribe((data) => {
      this.carregando = false;
      console.log(data);
    });
  }

  editarLojasOn(user: User) {
    if (
      user.editando === null ||
      user.editando === undefined ||
      user.editando === false
    ) {
      this.lojaService.getLojasUsuario(user.cpf).subscribe((data) => {
        user.editando = this.verificar(data);
      });
    } else {
      user.editando = false;
    }
  }

  verificar(clientesIds: number[]) {
    for(let user of this.users){
      user.editando = false;
    }

    for (let cliente of this.clientes) {
      if (clientesIds.find((c) => c === cliente.cD_CLIENTE)) {
        cliente.selecionado = true;
      }
      else{
        cliente.selecionado = false;
      }
    }

    return true;
  }

  editarLoja(user: User, cliente: Cliente) {
    this.carregando = true;
    this.usuarioService
      .editarLoja(user.cpf, cliente.cD_CLIENTE)
      .subscribe((data) => {
        this.carregando = false;
        console.log(data);
      });
  }
}
