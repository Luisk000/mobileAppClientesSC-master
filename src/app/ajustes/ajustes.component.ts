import { AlertController } from '@ionic/angular';
import { UsuarioService } from './../services/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {
  senhaAntiga: string;
  senhaNova: string;
  emailNovo: string;

  constructor(
    private router: Router, private usuarioService: UsuarioService,
    private alertController: AlertController) { }

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  async alterarSenha() {
    this.usuarioService
      .alterarSenha(
        localStorage.getItem('user'),
        this.senhaAntiga,
        this.senhaNova
      )
      .subscribe(async (data) => {
        this.senhaAntiga = '';
        this.senhaNova = '';
        if (data === true) {
          const alert = await this.alertController.create({
            header: 'Sucesso',
            message: 'Senha alterada com sucesso',
            cssClass: 'alert',
            buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
          });
          await alert.present();
        } else if (data === false) {
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Senha atual incorreta',
            cssClass: 'alert',
            buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Ocorreu um erro desconhecido',
            cssClass: 'alert',
            buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
          });
          await alert.present();
        }
      });
  }
  async alterarEmail() {
    this.usuarioService
      .alterarEmail(localStorage.getItem('user'), this.emailNovo)
      .subscribe(async (data) => {
        this.emailNovo = '';
        if (data === true) {
          const alert = await this.alertController.create({
            header: 'Sucesso',
            message: 'Email Alterado com sucesso',
            cssClass: 'alert',
            buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
          });
          await alert.present();
        } else if (data === false) {
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Email inválido',
            cssClass: 'alert',
            buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Ocorreu um erro desconhecido',
            cssClass: 'alert',
            buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
          });
          await alert.present();
        }
      });
  }
  async excluirUsuario() {
    this.usuarioService
      .alterarEmail(localStorage.getItem('user'), this.emailNovo)
      .subscribe(async (data) => {
        if (data === true) {
          this.logout();
        } else {
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Ocorreu um erro desconhecido',
            cssClass: 'alert',
            buttons: [{
              text: 'OK',
              cssClass: 'alert-button-main',
            }],
          });
          await alert.present();
        }
      });
  }
}
