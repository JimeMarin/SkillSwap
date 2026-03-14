import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Review, ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList {

  userId = '';
  reviews: Review[] = [];
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reviewService: ReviewService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.userId = this.route.snapshot.paramMap.get('user_id') ?? '';
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getUserReviews(this.userId).subscribe({
      next: (res) => {
        this.cdr.detectChanges();
        this.reviews = res;
      },
      error: (err) => {
        this.cdr.detectChanges();
        this.errorMessage = err.error?.error || 'Error loading reviews.';
      }
    });
  }
}
