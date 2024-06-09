import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Esto asegura que el servicio sea singleton
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Lógica para autenticarse
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
