/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';

@Component({
  selector: 'app-selecionarproduto',
  templateUrl: './selecionarproduto.component.html',
  styleUrls: ['./selecionarproduto.component.scss'],
})
export class SelecionarprodutoComponent implements OnInit {

  @Output() produtoSelecionado = new EventEmitter<Produto>();
  @Input() produtos: Produto[];

  constructor() { }

  ngOnInit() {}

  selecionarProduto(produto: Produto){
    this.produtoSelecionado.emit(produto);
  }
}
