import { AlertController, LoadingController } from '@ionic/angular';
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
import { CarrinhoService } from './../services/carrinho.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PedidoCarrinho } from '../model/pedidocarrinho.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  carregou = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {
    route.params.subscribe(() => {
      this.start();
    });
  }

  pedidosCarrinho: PedidoCarrinho[];
  subscription: Subscription;

  ngOnInit() {
    this.start();
  }

  start() {
    this.carregou = false;
    this.carrinhoService.getCarrinho(localStorage.getItem('cpf')).subscribe((data) => {
      if (data.toString().includes('Erro')){
        this.erroOcorrido();
      }
      else{
        this.pedidosCarrinho = data;
        this.carregou = true;
        console.log(this.pedidosCarrinho);
      }
    });
  }

  link(caminho: string) {
    this.router.navigate([caminho], {
      relativeTo: this.route,
    });
  }

  async removerPedido(pedidoCarrinho: PedidoCarrinho) {
    const alert = await this.alertController.create({
      header: 'Remover este pedido?',
      cssClass: 'alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-confirm',
        },
        {
          text: 'Sim',
          cssClass: 'alert-button-cancel',
          handler: () => {
            this.confirmarRemocao(pedidoCarrinho);
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmarPedido(pedidoCarrinho: PedidoCarrinho){
    const alert = await this.alertController.create({
      header: 'Confirmar este pedido?',
      cssClass: 'alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sim',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.confirmarAdicao(pedidoCarrinho);
          },
        },
      ],
    });

    await alert.present();
  }

  private confirmarRemocao(pedidoCarrinho: PedidoCarrinho){
    this.carregou = false;
    this.carrinhoService
    .removerPedido(pedidoCarrinho)
    .subscribe((data) => {
      if (data.toString().includes('Erro')){
        this.erroOcorrido();
      }
      else{
        var index = this.pedidosCarrinho.findIndex(
          (p) => p.cD_CLIENTE === pedidoCarrinho.cD_CLIENTE
        );
        this.pedidosCarrinho.splice(index, 1);
        this.carregou = true;
      }
    });
  }

  private confirmarAdicao(pedidoCarrinho: PedidoCarrinho){
    this.carregou = false;
    this.carrinhoService.confirmarPedidoCab(pedidoCarrinho)
      .subscribe((id) => {
        if (id.toString().includes('Erro')){
          this.erroOcorrido();
        }
        else {
          this.carrinhoService.confirmarPedidoDet(pedidoCarrinho.produtosCarrinho, id)
          .subscribe((data) => {
            if (data.includes('Erro')){
              this.erroOcorrido();
            }
            else{
              this.confirmarRemocao(pedidoCarrinho);
            }
          });
        }
      });
  }

  private async erroOcorrido(){
    const alert = await this.alertController.create({
      header: 'Ocorreu um erro, tente novamente mais tarde ou acesse Atendimento > Suporte',
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
