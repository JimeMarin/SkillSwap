import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Job, JobServices } from '../../services/job-services';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-search',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './job-search.html',
  styleUrl: './job-search.scss',
})
export class JobSearch {
  jobs: Job[] = [];
  errorMessage = '';

  category = '';
  status = 'open';
  min_budget: number | null = null;

  constructor(
    private readonly jobService: JobServices,
    private readonly cdr: ChangeDetectorRef) { 
      this.search();
    }

  search() {

    this.jobService.searchJobs({ category: this.category, status: this.status, min_budget: this.min_budget }).subscribe({
      next: (res) => {
        this.jobs = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.cdr.detectChanges();
      }
    })
  }
}
