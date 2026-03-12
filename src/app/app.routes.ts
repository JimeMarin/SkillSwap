import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Users } from './components/users/users';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'users/me', component: Users}
];
