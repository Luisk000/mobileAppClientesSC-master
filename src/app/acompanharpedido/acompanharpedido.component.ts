import { LojaService } from './../services/loja.service';
import { PedidoCab } from './../model/acompanharpedido/pedidocab.model';
import { LojaPedido } from './../model/acompanharpedido/lojapedido.model';
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
import { AlertController } from '@ionic/angular';
/* eslint-disable prefer-const */
import { ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../model/produto.model';
import { DatePipe } from '@angular/common';
import { Cliente } from '../model/cliente.models';

@Component({
  selector: 'app-acompanharpedido',
  templateUrl: './acompanharpedido.component.html',
  styleUrls: ['./acompanharpedido.component.scss'],
})
export class AcompanharpedidoComponent {
  carregou = false;
  itensPage: any = [];
  produtos: Produto[];
  lojas: LojaPedido[] = [];
  produtoMaisRecente: number;

  private index: number = 0;
  private readonly offset: number = 12;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private alertController: AlertController,
    private lojaService: LojaService
  ) { }

  ionViewWillEnter(){
    this.start();
  }

  start(){
    this.carregou = false;
    this.produtoService.getPedidosPendentes().subscribe((data) => {
      if (data.toString().includes('Erro')) {
        this.erroOcorrido();
      } else {
        this.produtos = data;

        this.lojaService.getLoja().subscribe((clientes: Cliente[]) => {
          if (clientes.toString().includes('Erro')) {
            this.erroOcorrido();
          }
          else {
            this.formatarDatas();
            this.separarPedidos(clientes);
            this.carregou = true;
          }
        });
      }
    });
  }

  separarPedidos(clientes: Cliente[]){
    for (let cliente of clientes){
      const lojaPedido = new LojaPedido();
      lojaPedido.CD_CLIENTE = cliente.cD_CLIENTE;
      lojaPedido.NM_FANTASIA = cliente.nM_FANTASIA;
      lojaPedido.pedidosCab = [];

      var ids = [];
      this.produtos
        .filter(p => p.cD_CLIENTE === cliente.cD_CLIENTE)
        .forEach((e) => ids.push(e.cD_PEDIDO));
      ids = ids.filter((value, index) => ids.indexOf(value) === index);

      if (ids.length !== 0){

        for (let id of ids){
          const pedidoCab = new PedidoCab();
          pedidoCab.CD_PEDIDO = id;
          pedidoCab.pedidosDet = [];
          this.produtos
            .filter(p => p.cD_PEDIDO === id)
            .forEach((e) => pedidoCab.pedidosDet.push(e));

          lojaPedido.pedidosCab.push(pedidoCab);
        }

        lojaPedido.pedidosCab.sort((a,b) => b.CD_PEDIDO - a.CD_PEDIDO);
        lojaPedido.pedidoMaisRecente = lojaPedido.pedidosCab[0].CD_PEDIDO;
        this.lojas.push(lojaPedido);
      }
    }
    this.lojas.sort((a,b) => b.pedidoMaisRecente - a.pedidoMaisRecente);
  }

  loadData(event) {
    setTimeout(() => {
      const news = this.produtoService['slice'](
        this.index,
        this.offset + this.index
      );
      this.index += this.offset;
      for (let i = 0; i < news.length; i++) {
        this.itensPage.push(news[i]);
      }
      event.target.complete();
    }, 1200);
  }

  link(caminho: string) {
    this.router.navigate([caminho], {
      relativeTo: this.route,
    });
  }

  formatarDatas() {
    for (let produto of this.produtos) {
      produto.dataPedidoString = this.datePipe.transform(
        produto.dT_PEDIDO,
        'dd/MM/yyyy'
      );

      if (produto.dT_ENTREGA === null) {
        produto.dT_PEDIDO = new Date(
          this.datePipe.transform(produto.dT_PEDIDO, 'YYYY-MM-dd')
        );
        produto.dataPrevistaString = this.datePipe.transform(
          produto.dT_PEDIDO.setDate(produto.dT_PEDIDO.getDate() + 8),
          'dd/MM/yyyy'
        );

        produto.entregue = false;
      } else {
        produto.dataEntregaString = this.datePipe.transform(
          produto.dT_ENTREGA,
          'dd/MM/yyyy'
        );

        produto.entregue = true;
      }
    }
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
