/* eslint-disable @typescript-eslint/naming-convention */
import { Cliente } from '../model/cliente.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceService } from './url-service.service';

@Injectable({
  providedIn: 'root',
})
export class LojaService {
  private url = this.urlService.url + 'loja';

  constructor(private http: HttpClient, private urlService: UrlServiceService) {}

  getLoja(): Observable<Cliente[]> {
    const body = {
      Cpf: localStorage.getItem('cpf'),
      RedeLoja: localStorage.getItem('redeloja')
    };
    return this.http.post<Cliente[]>(`${this.url}/GetLojas`, body);
  }

  getLojasUsuario(cpf: string) {
    return this.http.get<number[]>(`${this.url}/GetLojasUsuario/${cpf}`);
  }
}
