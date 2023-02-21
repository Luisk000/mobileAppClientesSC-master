/* eslint-disable @typescript-eslint/member-ordering */
import { LojaService } from './../../services/loja.service';
import { ProdutoService } from './../../services/produto.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.models';
import { Produto } from 'src/app/model/produto.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-selecionarloja',
  templateUrl: './selecionarloja.component.html',
  styleUrls: ['./selecionarloja.component.scss'],
})
export class SelecionarlojaComponent implements OnInit {
  clientes: Cliente[];
  @Output() lojaSelecionada = new EventEmitter<Produto[]>();
  carregou = false;

  constructor(
    private produtoService: ProdutoService,
    private lojaService: LojaService,
    private alertController: AlertController
  ) {
    this.lojaService
      .getLoja()
      .subscribe((data: Cliente[]) => {
        if (data.toString().includes('Erro')) {
          this.erroOcorrido();
        } else {
          this.clientes = data;
          this.carregou = true;
        }
      });
  }

  ngOnInit() {
  }

  selecionarLoja(cliente: Cliente) {
    this.produtoService
      .getItem(cliente.cD_CLIENTE)
      .subscribe((produtos: Produto[]) => {
        this.lojaSelecionada.emit(produtos);
      });
  }

  private async erroOcorrido() {
    const alert = await this.alertController.create({
      header:
        'Ocorreu um erro, tente novamente mais tarde ou acesse Atendimento > Suporte',
        cssClass: 'alert',
      buttons: [
        {
          text: 'Continuar',
          cssClass: 'alert-button-main',
          handler: () => {
            this.carregou = true;
          },
        },
      ],
    });

    await alert.present();
  }
}
