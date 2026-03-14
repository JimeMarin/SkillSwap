import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { JobDetails, JobServices } from '../../services/job-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-job-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './job-info.html',
  styleUrl: './job-info.scss',
})
export class JobInfo {
  job: JobDetails | null = null;
  errorMessage = '';

  isOwner = false;
  isFreelancer = false;

  constructor(
    private readonly jobService: JobServices,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: Auth,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadJob();
  }

  loadJob() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.jobService.getJobById(id).subscribe({
      next: (res) => {
        this.job = res;
        const currentUserId = this.authService.getUserId();
        this.isOwner = res.owner_id === currentUserId;
        this.isFreelancer = res.freelancer_id === currentUserId;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.cdr.detectChanges();
        this.router.navigate(['/jobs/search']);
      }
    });
  }
}

