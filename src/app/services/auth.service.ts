import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) {}
  getUserRole(): string {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return user.role;
    }
    return ''; // Return an empty string if user role is not found
  }
  login(username: string, password: string): boolean {
    // Replace this with your actual login validation logic (e.g., API call)
    if (username === 'validUser' && password === 'validPassword') {
      localStorage.setItem('user', JSON.stringify({ username: username }));
      return true;
    }
    return false;
  }
  
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  
}
