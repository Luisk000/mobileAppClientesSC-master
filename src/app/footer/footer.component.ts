/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { UsuarioService } from './../services/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @ViewChild('accordionGroup', { static: true })
  accordionGroup: IonAccordionGroup;


  constructor(private router: Router) {}

  toMostrar(index) {
    if (index === 1){
      this.router.navigate(['./inicio']);
    }
    else if (index === 2){
      this.router.navigate(['./atendimento']);
    }
    else if (index === 3){
      this.router.navigate(['./servicos']);
    }
    else if (index === 4){
      this.router.navigate(['./ajustes']);
    }
  }
}
