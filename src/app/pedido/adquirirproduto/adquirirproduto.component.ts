/* eslint-disable curly */
/* eslint-disable no-var */
import { CarrinhoService } from './../../services/carrinho.service';
import { AlertController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
@Component({
  selector: 'app-adquirirproduto',
  templateUrl: './adquirirproduto.component.html',
  styleUrls: ['./adquirirproduto.component.scss'],
})
export class AdquirirprodutoComponent implements OnInit {

  @Input() produtoSelecionado: Produto;
  @Output() produtoConfirmado = new EventEmitter();
  valid = false;
  carregou = true;
  quantidade: number;
  quantidadeEmbalagem: number;

  constructor(
    private alertController: AlertController,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {}

  validarQuantidade(event) {
    if (
      event !== 0 &&
      event !== null &&
      event % this.produtoSelecionado.qT_QTDENAEMBALAGEM === 0
    ) {
      this.valid = true;
      this.quantidadeEmbalagem =
        this.quantidade / this.produtoSelecionado.qT_QTDENAEMBALAGEM;
    } else {
      this.quantidadeEmbalagem = null;
      this.valid = false;
    }
  }

  validarQuantidadeEmbalagem(event) {
    if (event !== 0 && event !== null) {
      this.valid = true;
      this.quantidade =
        this.quantidadeEmbalagem * this.produtoSelecionado.qT_QTDENAEMBALAGEM;
    } else {
      this.quantidade = null;
      this.valid = false;
    }
  }

  async confirmar() {
    const alert = await this.alertController.create({
      header:
        'Adicionar o pedido de ' + this.quantidade + ' caixas ao carrinho?',
        cssClass: 'alert',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.carregou = false;
            this.adicionarCarrinho();
          },
        },
      ],
    });

    await alert.present();
  }

  adicionarCarrinho() {
    this.produtoSelecionado.qT_PRODUTO = this.quantidade;
    this.carrinhoService
      .adicionarCarrinho(this.produtoSelecionado)
      .subscribe(async (data) => {
        if (data.toString().includes('Erro')) {
          this.erroOcorrido();
        } else {
          await this.confirmarCarrinho(data);
        }
      });
  }

  async confirmarCarrinho(data: string) {
    var message;
    if (data === 'Sucesso') message = 'Pedido adicionado ao carrinho';
    else message = 'Ocorreu um erro, tente novamente mais tarde';

    const alert = await this.alertController.create({
      header: 'Pedido adicionado ao carrinho',
      cssClass: 'alert',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-main',
          handler: () => {
            this.produtoConfirmado.emit();
          },
        },
      ],
    });

    await alert.present();
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
