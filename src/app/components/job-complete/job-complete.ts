import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobDetails, JobServices } from '../../services/job-services';

@Component({
  selector: 'app-job-complete',
  imports: [CommonModule, RouterLink],
  templateUrl: './job-complete.html',
  styleUrl: './job-complete.scss',
})
export class JobComplete {
 job: JobDetails | null = null;
 errorMessage = '';
 submitting = false;

 constructor(
    private readonly jobService: JobServices,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadJob();
  }

  loadJob(){
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.jobService.getJobById(id).subscribe({
      next: (res) => {
        this.job = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error.error;
        this.cdr.detectChanges();
      }
    });
  }

  completeJob(){
    this.submitting = true;
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.jobService.completeJob(id).subscribe({
      next: () => {
        this.submitting = false;
        this.cdr.detectChanges();
        this.router.navigate(['/users/me']);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error.error;
        this.cdr.detectChanges();
      }
    });
  }
}
