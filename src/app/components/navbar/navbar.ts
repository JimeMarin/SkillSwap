import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isLoggedIn = true;

  constructor(private readonly authService: Auth) {
    this.isLoggedIn = !!this.authService.getToken();
  }

  logout(){
    //this.isLoggedIn = !this.isLoggedIn;
  }
}
