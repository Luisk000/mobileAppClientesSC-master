import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AlertController } from '@ionic/angular';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(public router: Router,
    private authService: AuthService,
    public toastrService: ToastrService,
    private alertController: AlertController,
    private usuarioService: UsuarioService
    ) { }

  async ngOnInit() {
    this.toastrService.toastrConfig.positionClass = 'toast-center-center';
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/inicio']);
    }

    this.ScheduleNotification();
  }
  public async login() {
    await this.authService.login(this.model).subscribe(
        () => {
          // eslint-disable-next-line no-debugger
          this.router.navigate(['/inicio']);
        }, async (error) => {
          console.log(error);
          const alert = await this.alertController.create({
            header:
              //'Login Inválido',
              "erro:" + error.message,
              cssClass: 'alert',
            buttons: [
              {
                text: 'Ok',
                cssClass: 'alert-button-main',
              },
            ],
          });

          await alert.present();
        }
        /* error => {
          if (error.status === 404) {
            this.toastrService.error(error.error);
          } else {
            this.toastrService.error('Ocorreu uma falha ao tentar efetuar o login!','Erro');
          }
        } */
      );
  }

  ScheduleNotification(){
    var options:LocalNotificationSchema={
      id: 12345,
      title: "teste",
      body: "teste body",
      summaryText: "teste SummaryText",
      largeBody: "largeBodyTeste",
      schedule: {
        repeats: true,
        //every: "day",
        on: {
          weekday: 2,
          hour: 15,
          minute: 20,
          second: 1
        }
      }
    }
    LocalNotifications.schedule({notifications:[options]})
  }

  backEndData: string;
  sqlData: string;
  FirebirdData: string;
  async testConnections(){
    this.usuarioService.testBackEnd().subscribe((data) => {
      this.backEndData = data;
      console.log(data);
    })
    this.usuarioService.testSql().subscribe((data) => {
      this.sqlData = data;
      console.log(data);
    })
    this.usuarioService.testFirebird().subscribe((data) => {
      this.FirebirdData = data;
      console.log(data);
    })

    const alert = await this.alertController.create({
      header:
        //'Login Inválido',
        "testeSql: " + this.sqlData + ", " + "testeBackEnd: " + this.backEndData + ", " + "testeFirebird: " + this.FirebirdData,
        cssClass: 'alert',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-main',
        },
      ],
    });

    await alert.present();
  }
}
