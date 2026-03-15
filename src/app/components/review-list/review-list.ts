import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Review, ReviewService } from '../../services/review.service';
import { UsersService} from '../../services/users';

@Component({
  selector: 'app-review-list',
  imports: [CommonModule],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList  {

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
        this.reviews = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error loading reviews.';
        this.cdr.detectChanges();
      }
    });
  }
}
