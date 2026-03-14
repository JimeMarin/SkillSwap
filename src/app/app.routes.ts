import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Users } from './components/users/users';
import { JobInfo } from './components/job-info/job-info';
import { JobCreate } from './components/job-create/job-create';
import { JobSearch } from './components/job-search/job-search';
import { JobUpdate } from './components/job-update/job-update';
import { JobPostings } from './components/job-postings/job-postings';
import { JobComplete } from './components/job-complete/job-complete';


export const routes: Routes = [
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'users/me', component: Users},
    {path: 'jobs/find', component: JobSearch},
    {path: 'job/new', component: JobCreate},
    {path: 'jobs/:id', component: JobInfo},
    {path: 'jobs/:id', component: JobUpdate},
    {path: 'jobs/postings', component: JobPostings},
    {path: 'jobs/complete', component: JobComplete}
];
