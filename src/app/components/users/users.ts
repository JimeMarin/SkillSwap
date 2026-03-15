import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService, UserProfile } from '../../services/users';



@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  user: UserProfile | null = null;
  errorMessage = '';

  constructor(
    private readonly usersService: UsersService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadUser();
  }

    
    
    loadUser() {
    this.usersService.getMe().subscribe({
      next: (res) => {
        this.user = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.cdr.detectChanges();
        this.errorMessage = 'Unable to load user profile';
      }
    });
  }
}
