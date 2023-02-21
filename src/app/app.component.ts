import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private router: Router, private menu: MenuController) {}

  logout() {
    localStorage.removeItem('token');
    this.menu.close();
    this.router.navigate(['/login']);
  }

}
