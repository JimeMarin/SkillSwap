import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobServices } from '../../services/job-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-create.html',
  styleUrl: './job-create.scss',
})
export class JobCreate {
  errorMessage = '';
  submitting = false;

  form = {
    title: '',
    description: '',
    budget: 0,
    category: ''
  }

  constructor(
    private jobService: JobServices,
    private router: Router
  ) { }

  submit() {

    if (!this.form.title.trim() || !this.form.description.trim() || !this.form.budget || !this.form.category.trim()) {
      this.errorMessage = 'Please fill in all the fields!';
      return;
    }

    this.submitting = true;
    this.jobService.postJobs(
      this.form.title,
      this.form.description,
      this.form.budget,
      this.form.category).subscribe({
        next: () => {
          this.router.navigate(['/jobs/postings']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.submitting = false;
        }
      })
  }
}
