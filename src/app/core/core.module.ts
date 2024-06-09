import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService  // Registrar el servicio aquí si no se usa providedIn: 'root'
  ]
})
export class CoreModule { }



/*
Uso del servicio de autenticación
Ahora vamos a utilizar este servicio en un componente para ver cómo funciona.

3. Crear un componente de login
features/home/home.component.ts
ts
Copiar código
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';  // Importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  login(username: string, password: string) {
    const success = this.authService.login(username, password);
    if (success) {
      alert('Login successful!');
    } else {
      alert('Login failed!');
    }
  }

  logout() {
    this.authService.logout();
  }

  checkLoginStatus() {
    return this.authService.isLoggedIn();
  }
}
features/home/home.component.html
html
Copiar código
<div>
  <h1>Home</h1>
  <div *ngIf="!checkLoginStatus()">
    <input #username type="text" placeholder="Username">
    <input #password type="password" placeholder="Password">
    <button (click)="login(username.value, password.value)">Login</button>
  </div>
  <div *ngIf="checkLoginStatus()">
    <p>You are logged in!</p>
    <button (click)="logout()">Logout</button>
  </div>
</div>
*/