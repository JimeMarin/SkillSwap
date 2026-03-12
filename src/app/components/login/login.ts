import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  constructor (
    private readonly authService: Auth,
    private readonly router: Router
  ){}

    submit(){
      this.authService.login(this.email, this.password).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/users/me']);
        }, 
        error: (err) => {
          console.log(err);
          //alert(err.error.error);
          this.errorMessage = err.error.error;
        }
      });
   }
}
