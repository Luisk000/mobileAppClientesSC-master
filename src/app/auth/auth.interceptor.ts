import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor{
   constructor(private router: Router) {}

   //ESSA FUNÇÃO CLONA, E ADICIONA O HEADER COM A VALIDAÇÃO DO USUÁRIO NA REQUISIÇÃO HTTP, DISPENSANDO ASSIM,
   //A NECESSIDADE DE ADICIONAR O TOKEN DE VALIDAÇÃO EM TODOS OS SERVIÇOS DO PROGRAMA
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') !== null) {
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });
            return next.handle(cloneReq).pipe(
                tap(
                    success => {},
                    err => {
                        if (err.status === 401){
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            );
        }
        else {
            return next.handle(req.clone());
        }
   }
}
