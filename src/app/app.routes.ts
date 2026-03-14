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
import { authGuard } from './guards/auth.guards';
import { guestGuard } from './guards/guest.guard';

import { ProposalDetailsComponent } from './components/proposal-details/proposal-details';
import { ProposalMyBidsComponent } from './components/proposal-my-bids/proposal-my-bids';

import { ReviewSend } from './components/review-send/review-send';
import { ReviewList } from './components/review-list/review-list';

import { PlatformStatsComponent } from './components/platform-stats/platform-stats';


export const routes: Routes = [
    {path: 'register', component: Register, canActivate: [guestGuard]},
    {path: 'login', component: Login, canActivate: [guestGuard]},
    {path: 'users/me', component: Users, canActivate: [authGuard]},

    {path: 'jobs/search', component: JobSearch},
    {path: 'job/new', component: JobCreate, canActivate: [authGuard]},
    {path: 'jobs/postings', component: JobPostings, canActivate: [authGuard]},
    {path: 'jobs/:id/update', component: JobUpdate, canActivate: [authGuard]},
    {path: 'jobs/:id/complete', component: JobComplete, canActivate: [authGuard]},
    {path: 'jobs/:id', component: JobInfo, canActivate: [authGuard]},
            
    { path: 'proposals/my-bids', component: ProposalMyBidsComponent, canActivate: [authGuard]},
    { path: 'proposals/:id', component: ProposalDetailsComponent, canActivate: [authGuard]},

    { path: 'jobs/:job_id/review/:target_id', component: ReviewSend, canActivate: [authGuard]},
    { path: 'reviews/user/:user_id', component: ReviewList, canActivate: [authGuard]},

    { path: 'platform/stats', component: PlatformStatsComponent, canActivate: [authGuard]}

];
