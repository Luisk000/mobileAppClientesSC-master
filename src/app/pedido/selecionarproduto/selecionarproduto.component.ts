import { ProdutoService } from './../../services/produto.service';
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-selecionarproduto',
  templateUrl: './selecionarproduto.component.html',
  styleUrls: ['./selecionarproduto.component.scss'],
})
export class SelecionarprodutoComponent implements OnInit {

  @Output() produtoSelecionado = new EventEmitter<Produto>();
  @Input() produtos: Produto[];

  constructor(private produtoService: ProdutoService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    for (let produto of this.produtos){
      this.produtoService.getImagem(produto).subscribe((data) => {
        let objectURL = URL.createObjectURL(data);
        produto.imagem = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      })
    }
  }

  selecionarProduto(produto: Produto){
    this.produtoSelecionado.emit(produto);
  }
}
