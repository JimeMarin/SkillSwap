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

import { ProposalDetailsComponent } from './components/proposal-details/proposal-details';
import { ProposalMyBidsComponent } from './components/proposal-my-bids/proposal-my-bids';

import { ReviewSend } from './components/review-send/review-send';
import { ReviewList } from './components/review-list/review-list';



export const routes: Routes = [
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'users/me', component: Users},
    {path: 'jobs/search', component: JobSearch},
    {path: 'job/new', component: JobCreate},

    {path: 'jobs/:id', component: JobInfo},
    {path: 'jobs/:id', component: JobUpdate},

    {path: 'jobs/postings', component: JobPostings},
    {path: 'jobs/complete', component: JobComplete},

    { path: 'proposals/my-bids', component: ProposalMyBidsComponent },
    { path: 'proposals/:id', component: ProposalDetailsComponent },

    { path: 'jobs/:job_id/review/:target_id', component: ReviewSend },
    { path: 'reviews/user/:user_id', component: ReviewList }


];
