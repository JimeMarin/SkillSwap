import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface jobFilters {
  category: string;
  status: string;
  min_budget: number;
  
}
export interface Job {
      id: string;
      title: string;
      description: string;
      budget: number;
      category: string;
      status: 'open' | 'in_progress' | 'completed';
      freelancer_id?: string;
      owner_id: string;
    }
@Injectable({
  providedIn: 'root',
})
export class JobServices {
  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app";
  constructor(
    private readonly http: HttpClient,
    private readonly authservice: Auth
  ) {}

  searchJobs(filters: jobFilters): Observable<Job[]> {
      return this.http.post<Job[]>(`${this.BASE_URL}/jobs/search`, filters)
    }

    postJobs(title: string, description: string, budget: number, category: string): Observable<Job> {
      return this.http.post<Job>(`${this.BASE_URL}/jobs/search`,
        {title, description, budget, category},
        {headers: new HttpHeaders(this.authservice.getAuthHeaders())})

    }

    getJobById(id: string): Observable<Job> {
      return this.http.get<Job>(`${this.BASE_URL}/jobs/${id}`,
        {headers: new HttpHeaders(this.authservice.getAuthHeaders())}
      )
    }

    updateJob(id: string, title?: string, description?: string, budget?: string, category?: string, status?: 'open' | 'in_progress' | 'completed'): Observable<Job> {
      return this.http.patch<Job>(`${this.BASE_URL}/jobs/${id}`,
        {title, description, budget, category, status},
        {headers: new HttpHeaders(this.authservice.getAuthHeaders())})

    }

    getMyPosting(): Observable<Job[]> {
      return this.http.get<Job[]>(`${this.BASE_URL}/jobs/my-postings`,
        {headers: new HttpHeaders(this.authservice.getAuthHeaders())}
      )
    }

    completeJob(id: string, ): Observable<Job> {
      return this.http.patch<Job>(`${this.BASE_URL}/jobs/${id}/complete`,
        {},
        {headers: new HttpHeaders(this.authservice.getAuthHeaders())})

    }
}
