import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Login form submit
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe( // Call AuthService login method with username and password
      () => {
        this.router.navigate(['/contacts']);
      },
      error => {
        this.errorMessage = 'Invalid login or password. Try again.'; // Set error message on login failure
      }
    );
  }

  // Navigate back to contacts list
  goBack() {
    this.router.navigate(['/contacts']);
  }
}
