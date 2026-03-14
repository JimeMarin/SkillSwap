import { ChangeDetectorRef, Component } from '@angular/core';
import { Job, JobServices } from '../../services/job-services';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-job-postings',
  imports: [CommonModule, RouterLink],
  templateUrl: './job-postings.html',
  styleUrl: './job-postings.scss',
})
export class JobPostings {
  jobs: Job[] = [];
  errorMessage = '';

  constructor(
    private readonly jobService: JobServices,
    private readonly authService: Auth,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.LoadMyJobs();
  }

  LoadMyJobs() {
    this.jobService.getMyPosting().subscribe({
      next: (res) => {
        this.jobs = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error.error;
        this.cdr.detectChanges();
      }
    });
  }
  goToComplete(id: string) {
    this.router.navigate(['/jobs', id, 'complete']);
  }
}
