import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
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
          this.authService.setToken(res.token);
          this.authService.setUserId(res.user.id);
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
