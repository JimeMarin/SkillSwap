import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobServices } from '../../services/job-services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-job-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-update.html',
  styleUrl: './job-update.scss',
})
export class JobUpdate {
  errorMessage = '';
  submitting = false;

  form = {
    title: '',
    description: '',
    budget: 0,
    category: '',
    status: '' as 'open' | 'in_progress' | 'completed' | ''
  }

  constructor(
    private readonly jobService: JobServices,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadJob();
  }


  loadJob() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.jobService.getJobById(id).subscribe({
      next: (res) => {
        this.form.title = res.title;
        this.form.description = res.description;
        this.form.budget = res.budget;
        this.form.category = res.category;
        this.form.status = res.status;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error.error;
        this.cdr.detectChanges();
      }
    });
  }

  submit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.submitting = true;

    this.jobService.updateJob(
      id,
      this.form.title,
      this.form.description,
      this.form.budget,
      this.form.category,
      this.form.status as 'open' | 'in_progress' | 'completed'
    ).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/jobs', id]);
      },
      error: (err) => {
        this.errorMessage = err.error.error;
        this.submitting = false;
      }
    });
  }
}
