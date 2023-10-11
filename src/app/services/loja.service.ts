/* eslint-disable @typescript-eslint/naming-convention */
import { Cliente } from '../model/cliente.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from './url-service.service';

@Injectable({
  providedIn: 'root',
})
export class LojaService {
  private url = this.urlService.url + 'loja';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'*',
        'Access-Control-Allow-Headers':'*',
        'Access-Control-Allow-Credentials': 'true'
    })
  }

  constructor(private http: HttpClient, private urlService: UrlServiceService) {}

  getLoja(): Observable<Cliente[]> {
    const body = {
      Cpf: localStorage.getItem('cpf'),
      RedeLoja: localStorage.getItem('redeloja')
    };
    return this.http.post<Cliente[]>(`${this.url}/GetLojas`, body, this.httpOptions);
  }

  getLojasUsuario(cpf: string) {
    return this.http.get<number[]>(`${this.url}/GetLojasUsuario/${cpf}`, this.httpOptions);
  }
}
