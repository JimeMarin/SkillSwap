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

export interface JobCreateResponse {
  job_id: string;
  message: string;
}

export interface JobDetails {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: 'open' | 'in_progress' | 'completed';
  owner_id: string;
  freelancer_id: string | null;

  owner: {
    id: string;
    name: string;
    username: string;
    rating_avg: number;
  };

  freelancer: {
    id: string;
    name: string;
    username: string;
    rating_avg: number;
  } | null;
}

export interface JobUpdateResponse {
  message: string;
}

export interface JobCompleteResponse {
  message: string;
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

  postJobs(title: string, description: string, budget: number, category: string): Observable<JobCreateResponse> {
    return this.http.post<JobCreateResponse>(`${this.BASE_URL}/jobs`,
      { title, description, budget, category },
      { headers: new HttpHeaders(this.authservice.getAuthHeaders()) }
    );
  }


  getJobById(id: string): Observable<JobDetails> {
    return this.http.get<JobDetails>(`${this.BASE_URL}/jobs/${id}`,
      {headers: new HttpHeaders(this.authservice.getAuthHeaders())}
    )
  }

  updateJob(id: string, title?: string, description?: string, budget?: number, category?: string, status?: 'open' | 'in_progress' | 'completed'): Observable<JobUpdateResponse> {
    return this.http.patch<JobUpdateResponse>(`${this.BASE_URL}/jobs/${id}`,
      {title, description, budget, category, status},
      {headers: new HttpHeaders(this.authservice.getAuthHeaders())}
    )
  }

  getMyPosting(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.BASE_URL}/jobs/my-postings`, 
      {headers: new HttpHeaders(this.authservice.getAuthHeaders())}
    )
  }

  completeJob(id: string, ): Observable<JobCompleteResponse> {
    return this.http.patch<JobCompleteResponse>(`${this.BASE_URL}/jobs/${id}/complete`,
      {},
      {headers: new HttpHeaders(this.authservice.getAuthHeaders())}
    )
  }
}
