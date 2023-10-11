/* eslint-disable @typescript-eslint/naming-convention */
import { Cliente } from '../model/cliente.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UrlServiceService } from './url-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = this.urlService.url + 'Usuarios';

constructor(private http: HttpClient, private urlService: UrlServiceService) { }

httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'*',
      'Access-Control-Allow-Headers':'*',
      'Access-Control-Allow-Credentials': 'true'
  })
}

  getId(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/GetId/`, this.httpOptions);
  }

  getUsers(){
    const body = {
      Cpf: localStorage.getItem('cpf'),
      RedeLoja: localStorage.getItem('redeloja')
    };
    return this.http.post<User[]>(`${this.baseUrl}/GetAllUsers`, body, this.httpOptions);
  }

  changeUser(cpf: string){
    return this.http.get<User>(`${this.baseUrl}/ChangeUser/${cpf}`, this.httpOptions);
  }

  criar(funcionario: User, clientes: Cliente[]): Observable<string> {
    const body = {
      userName: funcionario.userName,
      email: funcionario.email,
      Cpf: funcionario.cpf,
      RedeLoja: funcionario.redeLoja,
      newPassword: funcionario.passwordHash,
      roleName: 'funcionario',
      clientes
    };
    return this.http.post<string>(`${this.baseUrl}/criar/`, body, this.httpOptions);
  }

  criarAdmin(funcionario: User): Observable<string> {
    const body = {
      userName: funcionario.userName,
      email: funcionario.email,
      Cpf: funcionario.cpf,
      RedeLoja: funcionario.redeLoja,
      newPassword: funcionario.passwordHash,
      roleName: 'admin'
    };
    return this.http.post<string>(`${this.baseUrl}/criar/`, body, this.httpOptions);
  }

  alterarSenha(email: string, oldPassword: string, newPassword: string){
    const body = {
      email,
      oldPassword,
      newPassword
    };
    return this.http.post<boolean>(`${this.baseUrl}/ChangePassword`, body, this.httpOptions);
  }

  alterarEmail(email: string, newEmail: string){
    const body = {
      email,
      newEmail
    };
    return this.http.post<boolean>(`${this.baseUrl}/ChangeEmail`, body, this.httpOptions);
  }

  excluirUsuario(email: string){
    const body = {
      email
    };
    return this.http.post<boolean>(`${this.baseUrl}/DeleteUser`, body, this.httpOptions);
  }

  verifyRole(userName){
    const body = {
      userName
    };
    return this.http.post<string>(`${this.baseUrl}/VerificarRole`, body, this.httpOptions);
  }

  editarLoja(cpf: string, cliente: number){
    const body = {
      Cpf: cpf,
      idClienteSelecionado: cliente
    };
    return this.http.post<string>(`${this.baseUrl}/${'ChangeLojaUsuario'}`, body, this.httpOptions);
  }

  testBackEnd(){
    return this.http.get<string>(`${this.baseUrl}/${'TestBackEnd'}`, this.httpOptions);
  }

  testSql(){
    return this.http.get<string>(`${this.baseUrl}/${'TestSql'}`, this.httpOptions);
  }

  testFirebird(){
    return this.http.get<string>(`${this.baseUrl}/${'TestFirebird'}`, this.httpOptions);
  }
}



