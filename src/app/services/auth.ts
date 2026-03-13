import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  rating_avg: number;
  skills: string[];
}
@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app";
  constructor(private readonly http: HttpClient) {}
     //https://stingray-app-wxhhn.ondigitalocean.app/auth/login
     //https://stingray-app-wxhhn.ondigitalocean.app/auth/register
    login(email: string, password: string): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/login`,{email, password})
    }

    register(name: string, username: string, email: string, password: string, bio: string, skills: string[]): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/register`,{name, username, email, password,bio, skills})
    }
}
