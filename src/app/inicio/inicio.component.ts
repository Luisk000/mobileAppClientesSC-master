import { ActivatedRoute } from '@angular/router';
/* eslint-disable no-var */
import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements DoCheck {
public item;
permiteCadastrar = false;
permiteCadastrarAdmin = false;

 /*  slideOpts = {
    initialSlide: 1,
    speed: 2000
  };
  produto: Produto[];
  itensPage: any = [];
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private index: number = 0;
  private readonly offset: number = 12; */


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngDoCheck() {
    var role = localStorage.getItem('role');
    if (role === 'master'){
      this.permiteCadastrar = true;
      this.permiteCadastrarAdmin = true;
    }
    else if (role === 'admin'){
      this.permiteCadastrar = true;
      this.permiteCadastrarAdmin = false;
    }
    else{
      this.permiteCadastrar = false;
      this.permiteCadastrarAdmin = false;
    }
}


link(caminho: string){
  this.router.navigate(['../' + caminho], {
    relativeTo: this.route,
  });
}

}
