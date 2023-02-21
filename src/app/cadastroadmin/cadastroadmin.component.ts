/* eslint-disable no-var */
import { Cliente } from '../model/cliente.models';
import {
  AlertController,
  IonInfiniteScroll,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LojaService } from '../services/loja.service';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-cadastroadmin',
  templateUrl: './cadastroadmin.component.html',
  styleUrls: ['./cadastroadmin.component.scss'],
})
export class CadastroadminComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  userRegister: FormGroup;
  userId: number;
  itens = [];
  isTextFieldType: boolean;
  itensPage: any = [];
  user: User;
  carregou = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private index: number = 0;
  private readonly offset: number = 12;

  constructor(
    public route: Router,
    private lojaService: LojaService,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.userRegister = this.formBuilder.group({
      rede: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  async ngOnInit() {
    var role = localStorage.getItem('role');
    if (role !== 'master'){
      const alert = await this.alertController.create({
        header: 'Rota bloqueada',
        message: 'Você não possui permissão para acessar esta página',
        cssClass: 'alert',
        buttons: [{
            text: 'Voltar',
            cssClass: 'alert-button-main',
            handler: () => {
              this.route.navigate(['./inicio']);
            },
          }]
      });
      await alert.present();
    }
    else{
      this.itensPage = this.itens.slice(this.index, this.offset + this.index);
      this.index += this.offset;
      this.carregou = true;
    }

  }

  loadData(event) {
    setTimeout(() => {
      const news = this.itens.slice(this.index, this.offset + this.index);
      this.index += this.offset;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < news.length; i++) {
        this.itensPage.push(news[i]);
      }
      event.target.complete();
    }, 500);
  }
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  async criarUsuario() {
    var user: User = {};
    user.cpf = this.userRegister.get('cpf').value;
    user.email = this.userRegister.get('email').value;
    user.passwordHash = this.userRegister.get('senha').value;
    user.redeLoja = this.userRegister.get('rede').value;
    user.userName = this.userRegister.get('nome').value;

    this.usuarioService.criarAdmin(user).subscribe(
      async () => {
        const alert = await this.alertController.create({
          header: 'Sucesso',
          cssClass: 'alert',
          buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
        });
        await alert.present();
        this.userRegister.reset();
      },
      async (error) => {
        const alert = await this.alertController.create({
          message: error.error,
          cssClass: 'alert',
          buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
        });
        await alert.present();
      }
    );
  }
}
