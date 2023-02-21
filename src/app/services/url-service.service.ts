import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  constructor() { }

  //public url = 'https://localhost:36600/api/';
  public url = 'http://192.168.0.202:987/api/';
  
}
