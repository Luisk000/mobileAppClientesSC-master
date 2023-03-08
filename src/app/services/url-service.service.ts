import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  constructor() { }

  //public url = 'http://localhost:36600/api/';
  //public url = 'http://192.168.0.202:987/api/';
  //public url = 'http://192.168.0.229:57474/mobile.api/api/';
  public url = 'http://srcaixa.ddns.net:57474/mobile.api/api/';

}
