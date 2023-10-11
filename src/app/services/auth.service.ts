import { UrlServiceService } from './url-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
const minutosAutoLogout = 30;
const checkInternal = 15000;
const storeKey = 'lastAction';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = this.urlService.url + 'usuarios';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  redeloja: any;
  userRegister: User = {
    editando: false
  };

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'*',
        'Access-Control-Allow-Headers':'*',
        'Access-Control-Allow-Credentials': 'true'
    })
  }

constructor(
  private httpCliente: HttpClient,
  private router: Router,
  private usuarioService: UsuarioService,
  private urlService: UrlServiceService) {
  this.check();
  this.initListener();
  this.initInterval();
  localStorage.setItem(storeKey, Date.now().toString());
}

check(){
  const now = Date.now();
  const timeleft = this.getLastAction() + minutosAutoLogout * 30 * 1000;
  const diff = timeleft - now;
  const isTimeout = diff < 0;

  if(isTimeout){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
public getLastAction() {
  // eslint-disable-next-line radix
  return parseInt(localStorage.getItem(storeKey));
}
public setLastAction(lastAction: number) {
  localStorage.setItem(storeKey, lastAction.toString());
}

initListener() {
  document.body.addEventListener('click', () => this.reset());
  document.body.addEventListener('mouseover',()=> this.reset());
  document.body.addEventListener('mouseout',() => this.reset());
  document.body.addEventListener('keydown',() => this.reset());
  document.body.addEventListener('keyup',() => this.reset());
  document.body.addEventListener('keypress',() => this.reset());
}
reset() {
  this.setLastAction(Date.now());
}
initInterval() {
  setInterval(() => {
    this.check();
  }, checkInternal);
}
loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
register(usuario: User){
  return this.httpCliente.post<User>(`${this.baseUrl}/criar`,usuario, this.httpOptions);
}
login(model: any) {
  return this.httpCliente
    .post(`${this.baseUrl}/login`, model, this.httpOptions).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          console.log(user);
          localStorage.setItem('token',user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem('username', this.decodedToken.unique_name);
          localStorage.setItem('redeloja', user.user.redeLoja);
          localStorage.setItem('cpf', user.user.cpf);
          localStorage.setItem('user', this.decodedToken.unique_name);
          // eslint-disable-next-line @typescript-eslint/no-shadow
          this.usuarioService.verifyRole(user.user.userName).subscribe((response) => {
            localStorage.setItem('role', response);
          });
        };
      })
    );
}

relogin(){
  const decodedDetails = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    const model: any = {
      password: null,
      userName: decodedDetails.unique_name
    };
  this.httpCliente
    .post(`${this.baseUrl}/Relogin`, model, this.httpOptions).pipe(
      map((response: any) => {
        const user = response;
        console.log(response);
        if (user) {
          localStorage.setItem('token',user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem('username', this.decodedToken.unique_name);
          localStorage.setItem('rolesUsuario', JSON.stringify(this.decodedToken.role));
          localStorage.setItem('user', this.decodedToken.unique_name);
        };
      })
    )
    .subscribe(() => {});
}
}
