import { SpinnerComponent } from './spinner/spinner.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { AdquirirprodutoComponent } from './pedido/adquirirproduto/adquirirproduto.component';
import { SelecionarprodutoComponent } from './pedido/selecionarproduto/selecionarproduto.component';
import { SelecionarlojaComponent } from './pedido/selecionarloja/selecionarloja.component';
import { AcompanharpedidoComponent } from './acompanharpedido/acompanharpedido.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { CadastrousuarioComponent } from './cadastrousuario/cadastrousuario.component';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { ProblemapedidoComponent } from './problemapedido/problemapedido.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { CadastroadminComponent } from './cadastroadmin/cadastroadmin.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CadastrousuarioComponent,
    FooterComponent,
    ProblemapedidoComponent,
    LoginComponent,
    CadastroadminComponent,
    AtendimentoComponent,
    AjustesComponent,
    PedidoComponent,
    AcompanharpedidoComponent,
    SelecionarlojaComponent,
    SelecionarprodutoComponent,
    AdquirirprodutoComponent,
    CarrinhoComponent,
    EditarusuarioComponent,
    SpinnerComponent
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormBuilder,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
