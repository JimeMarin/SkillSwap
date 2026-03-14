import { ChangeDetectorRef, Component } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-review-send',
  imports: [FormsModule, CommonModule],
  templateUrl: './review-send.html',
  styleUrl: './review-send.scss',
})
export class ReviewSend {

  jobId = '';
  targetId = '';
  rating = 1;
  comment = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reviewService: ReviewService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.jobId = this.route.snapshot.paramMap.get('job_id') ?? '';
    this.targetId = this.route.snapshot.paramMap.get('target_id') ?? '';
  }

  send() {
    this.reviewService.submitReview(this.jobId, this.targetId, this.rating, this.comment).subscribe({
      next: (res) => {
        this.cdr.detectChanges();
        this.successMessage = res.message;
      },
      error: (err) => {
        this.cdr.detectChanges();
        this.errorMessage = err.error?.error || 'Error submitting review.';
      }
    });
  }
}
