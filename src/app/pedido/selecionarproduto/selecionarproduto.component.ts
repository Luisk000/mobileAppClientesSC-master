import { ProdutoService } from './../../services/produto.service';
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-selecionarproduto',
  templateUrl: './selecionarproduto.component.html',
  styleUrls: ['./selecionarproduto.component.scss'],
})
export class SelecionarprodutoComponent implements OnInit {
  @Output() produtoSelecionado = new EventEmitter<Produto>();
  @Input() produtos: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit() {
   this.getImages();
  }

  selecionarProduto(produto: Produto) {
    this.produtoSelecionado.emit(produto);
  }

  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: string = '';
  getImages(){
    for (let produto of this.produtos) {
      this.produtoService.getImagem(produto).subscribe((data) => {
/*         if (data != undefined && data != null){
          let objectURL = URL.createObjectURL(data);
          //const imagem: any = this.sanitizer.bypassSecurityTrustUrl(objectURL);

          this.imageCompress
            .compressFile(objectURL, -1, 50, 50)
            .then((result: DataUrl) => {
              produto.imagem = result;
            });
        }
        else{ */
          produto.imagem = "../../../assets/imagem-nao-encontrada.jpg";
        //}
      });
    }
  }

}
