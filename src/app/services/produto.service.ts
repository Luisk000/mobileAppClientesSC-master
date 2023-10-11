/* eslint-disable @typescript-eslint/naming-convention */
import { Produto } from './../model/produto.model';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlServiceService } from './url-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  [x: string]: any;
  private url = this.urlService.url + 'Produto';

  constructor(private http: HttpClient, private urlService: UrlServiceService) {}

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'*',
        'Access-Control-Allow-Headers':'*',
        'Access-Control-Allow-Credentials': 'true'
    })
  }

  getItem(id: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/${id}`);
  }

  getPedidosPendentes(){
    const body = {
      CD_REDELOJA: localStorage.getItem('redeloja')
    };
    return this.http.post<Produto[]>(`${this.url}/${'GetPedidosPendentes'}`, body, this.httpOptions);
  }

  getImagem(produto: Produto) {
    const body = {
      CD_CLIENTE: produto.cD_CLIENTE,
      CD_PEDIDO: produto.cD_PRODUTO
    }

    let horde = new HttpHeaders();
    horde = horde.set('Accept', 'image/jpeg');
    return this.http.post(this.url + "/GetImage", body, { headers: horde, responseType: "blob" })
  }
}
