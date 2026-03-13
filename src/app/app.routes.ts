import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Users } from './components/users/users';


export const routes: Routes = [
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'users/me', component: Users}
];
