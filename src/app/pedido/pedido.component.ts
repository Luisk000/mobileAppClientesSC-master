/* eslint-disable no-trailing-spaces */
import { Router, ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente.models';
import { Produto } from '../model/produto.model';
import { LojaService } from '../services/loja.service';
import { ProdutoService } from '../services/produto.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent {
  produtos: Produto[];
  produtoSelecionado: Produto;
  clientes: Cliente[];
  etapa = 1;
  itensPage: any = [];
  user: User = {};
  carregou = false;
  itens = [];
  private index: number = 1;
  private readonly offset: number = 12;
  public histPedido;
  public venda;

  constructor(private router: Router, private route: ActivatedRoute) {}


  loadData(event) {
    setTimeout(() => {
      const news = this.produtos.slice(this.index, this.offset + this.index);
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

  receberProdutos(event) {
    this.produtos = event;
    this.etapa = 2;
  }

  receberProdutoSelecionado(event) {
    this.produtoSelecionado = event;
    this.etapa = 3;
  }
}
