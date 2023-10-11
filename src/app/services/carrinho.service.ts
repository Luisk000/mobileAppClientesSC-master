/* eslint-disable prefer-const */
/* eslint-disable no-var */
import { PedidoCarrinho } from './../model/pedidocarrinho.model';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/produto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlServiceService } from './url-service.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'*',
        'Access-Control-Allow-Headers':'*',
        'Access-Control-Allow-Credentials': 'true'
    })
  }

  constructor(private http: HttpClient, private urlService: UrlServiceService) { }
  private url = this.urlService.url + 'Produto';

  adicionarCarrinho(produto: Produto) {
    const body = {
      CD_PRODUTO: produto.cD_PRODUTO,
      CD_CLIENTE: produto.cD_CLIENTE,
      NM_FANTASIA: produto.nM_FANTASIA,
      NM_PRODUTO: produto.nM_PRODUTO,
      NM_CPFUSUARIO: localStorage.getItem('cpf'),
      QT_PRODUTO: produto.qT_PRODUTO,
    };
    return this.http.post<string>(`${this.url}/${'AdicionarCarrinho'}`, body, this.httpOptions);
  }

  getCarrinho(userCpf: string){
    return this.http.get<PedidoCarrinho[]>(`${this.url}/${'GetCarrinho'}/${userCpf}`, this.httpOptions);
  }

  private pedidosAtualizados = new BehaviorSubject<PedidoCarrinho[]>(undefined);
  pedidosAtuais = this.pedidosAtualizados.asObservable();

  atualizarCarrinho(pedidos: PedidoCarrinho[]) {
    this.pedidosAtualizados.next(pedidos);
  }

  removerPedido(pedidoCarrinho: PedidoCarrinho){
    const body = {
      CD_CLIENTE: pedidoCarrinho.cD_CLIENTE,
      NM_FANTASIA: pedidoCarrinho.nM_FANTASIA,
      NM_CPFUSUARIO: localStorage.getItem('cpf'),
    };
    return this.http.post<PedidoCarrinho>(`${this.url}/${'RemoverCarrinho'}`, body, this.httpOptions);
  }

  confirmarPedidoCab(pedido: PedidoCarrinho){
    const body = {
      CD_CLIENTE: pedido.cD_CLIENTE,
      NM_FANTASIA: pedido.nM_FANTASIA
    };
    return this.http.post<number>(`${this.url}/${'ConfirmarPedidoCab'}`, body, this.httpOptions);
  }


  confirmarPedidoDet(produtos: Produto[], pedido: number){
    var body: any[] = [];
    for(let produto of produtos){
      var prod = {
        CD_PEDIDO: pedido,
        CD_PRODUTO: produto.cD_PRODUTO,
        CD_CLIENTE: produto.cD_CLIENTE,
        NM_FANTASIA: produto.nM_FANTASIA,
        NM_PRODUTO: produto.nM_PRODUTO,
        NM_CPFUSUARIO: localStorage.getItem('cpf'),
        QT_PRODUTO: produto.qT_PRODUTO
      };
      body.push(prod);
    }
    return this.http.post<string>(`${this.url}/${'ConfirmarPedidosDet'}`, body, this.httpOptions);
  }
}
