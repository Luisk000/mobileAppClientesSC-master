import { CarrinhoComponent } from './carrinho/carrinho.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';
import { AcompanharpedidoComponent } from './acompanharpedido/acompanharpedido.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { CadastroadminComponent } from './cadastroadmin/cadastroadmin.component';
import { AppComponent } from './app.component';
import { ProblemapedidoComponent } from './problemapedido/problemapedido.component';
import { FooterComponent } from './footer/footer.component';
import { CadastrousuarioComponent } from './cadastrousuario/cadastrousuario.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
   {
    path: 'login', component: LoginComponent
  },
  {
    path: 'app-component', component: AppComponent, canActivate:[AuthGuard]
  },
  {
    path: 'cadastrousuario', component: CadastrousuarioComponent, canActivate:[AuthGuard]
  },
  {
    path: 'footer', component: FooterComponent,canActivate:[AuthGuard]
  },
  {
    path: 'problemapedido', component: ProblemapedidoComponent,canActivate:[AuthGuard]
  },
  {
    path: 'cadastroadmin', component: CadastroadminComponent,canActivate:[AuthGuard]
  },
  {
    path: 'atendimento', component: AtendimentoComponent,canActivate:[AuthGuard]
  },
  {
    path: 'ajustes', component: AjustesComponent,canActivate:[AuthGuard]
  },
  {
    path: 'pedido', component: PedidoComponent,canActivate:[AuthGuard]
  },
  {
    path: 'acompanharpedido', component: AcompanharpedidoComponent,canActivate:[AuthGuard]
  },
  {
    path: 'editarusuario', component: EditarusuarioComponent,canActivate:[AuthGuard]
  },
  {
    path: 'carrinho', component: CarrinhoComponent,canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
