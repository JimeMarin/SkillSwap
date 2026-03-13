import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  name = '';
  userName = '';
  email = '';
  password = '';
  bio = '';
  skills = [''];
  errorMessage = '';

  constructor(
    private readonly authService: Auth,
    private readonly router: Router
  ) {}

  submit() {
    this.authService
      .register(this.name, this.userName, this.email, this.password, this.bio, this.skills)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          //alert(err.error.error);
          this.errorMessage = err.error.error; //err = obj, error = key, error = value
        },
      });
  }
}
