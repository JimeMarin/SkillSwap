import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface Review {
  id: string;
  job_id: string;
  reviewer_id: string;
  target_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface ReviewCreateResponse {
  message: string;
  review_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {}

  submitReview(job_id: string, target_id: string, rating: number, comment?: string): Observable<ReviewCreateResponse> {
    return this.http.post<ReviewCreateResponse>(
      `${this.BASE_URL}/jobs/${job_id}/reviews`,
      { target_id, rating, comment },
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }

  getUserReviews(user_id: string): Observable<Review[]> {
    return this.http.get<Review[]>(
      `${this.BASE_URL}/reviews/user/${user_id}`,
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }  
}
