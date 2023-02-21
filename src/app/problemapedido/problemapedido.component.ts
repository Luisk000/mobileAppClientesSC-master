import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problemapedido',
  templateUrl: './problemapedido.component.html',
  styleUrls: ['./problemapedido.component.scss']
})
export class ProblemapedidoComponent implements OnInit {
  public item;
  itensPage: any = [];
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private index: number = 0;
  private readonly offset: number = 12;

  constructor() {
    this.item = [
    {nome:'Carine Prates', img:'../../assets/carine.jpeg', link: 'https://api.whatsapp.com/send?phone=5511938061700'},
    {nome: 'Juliete ',img:'../../assets/juliete.jpeg', link: 'https://api.whatsapp.com/send?phone=5511938061666' },
    {nome: 'Marielle Reis',img:'../../assets/marielle.jpeg', link: 'https://api.whatsapp.com/send?phone=5511938013261' },
    {nome: 'Daniele da Silva',img:'../../assets/daniele.jpeg', link: 'https://api.whatsapp.com/send?phone=5511938061799' },
    {nome: 'Cintia Nascimento',img:'../../assets/cintia.jpeg', link: 'https://api.whatsapp.com/send?phone=5511938018872' },
    {nome: 'Thalita Franco',img:'../../assets/thalita.jpeg', link: 'https://api.whatsapp.com/send?phone=5511937127198' },
    {nome: 'Carolina',img:'../../assets/carolina.jpeg', link: 'https://api.whatsapp.com/send?phone=5511938061888' },

    ];
  }

  ngOnInit() {
    this.itensPage = this.item.slice(this.index,  this.offset + this.index);
    this.index += this.offset;

}
loadData(event){
setTimeout(() => {
  const news = this.item.slice(this.index,  this.offset + this.index);
  this.index += this.offset;

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for(let i= 0; i<news.length; i++){
    this.itensPage.push(news[i]);

  }
  event.target.complete();

}, 1200);

}

}
