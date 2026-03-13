import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface Job {
      title: string;
      description: string;
      budget: number;
      category: string;
    }
    
@Injectable({
  providedIn: 'root',
})
export class Job {
  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app";
  constructor(
    private readonly http: HttpClient,
    private readonly authservice: Auth
  ) {}

  
    listJobs(category: string, status: string, min_budget: number): Observable<Job[]> {
      return this.http.post<Job[]>(`${this.BASE_URL}/jobs/search`,{category, status, min_budget})
    }

    postJobs(title: string, description: string, budget: number, category: string): Observable<Job> {
      return this.http.post<Job>(`${this.BASE_URL}/jobs/search`,{title, description, budget, category}) //{headers: new HttpHeaders(this.authservice.getAuthHeaders())}
    }
}
    

