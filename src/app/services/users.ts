import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  skills: string[];
  rating_avg: number;
  completed_jobs: number;
}


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app";

  constructor(
    private readonly http: HttpClient,
    private readonly auth: Auth
  ) {}

  // GET /users/me
  getMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.BASE_URL}/users/me`,
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }

  // GET /users/<username>
  getByUsername(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.BASE_URL}/users/${username}`,
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }
}
