import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loggedIn: boolean | undefined;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  // Check if logged in on init
  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  // Method to call AuthService logout method
  logout(): void {
    this.authService.logout();
  }

  // Method to navigate to login route using Router service
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
