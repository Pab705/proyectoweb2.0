import { Component } from '@angular/core';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoweb';
  constructor (private authService:AuthService){
  }
  isUserLoggedIn():boolean{
    return this.authService.isAuthenticated();
  }
}
