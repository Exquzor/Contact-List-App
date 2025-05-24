import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth'; // API endpoints for authentication
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenPresent()); // Observable to track login status

  loggedIn$ = this.loggedIn.asObservable(); // Public observable for other components to subscribe to

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkLoginStatus(); // Check login status on service initialization
  }

  // Method to log in the user
  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { withCredentials: true })
      .pipe(tap(() => {
        this.loggedIn.next(true); // Update login status
        localStorage.setItem('isLoggedIn', 'true'); // Store login status in local storage
      }));
  }

  // Method to log out the user
  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.loggedIn.next(false); // Update login status
      localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
      this.router.navigate(['/login']); // Navigate to login page when logging out
    });
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  // Private method to check if the JWT token is present in cookies
  private isTokenPresent(): boolean {
    return document.cookie.split(';').some((item) => item.trim().startsWith('jwt='));
  }

  // Check login status from local storage
  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.loggedIn.next(true); // If login status is found in local storage, update the observable
    } else {
      this.loggedIn.next(false); // Otherwise set the logged in status to false
    }
  }
}
