import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  skills: string[];
  rating_avg: number;
}
@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app";

  constructor(private readonly http: HttpClient) { }
  //https://stingray-app-wxhhn.ondigitalocean.app/auth/login
  //https://stingray-app-wxhhn.ondigitalocean.app/auth/register


  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/login`, { email, password })
  }

  register(name: string, username: string, email: string, password: string, bio: string, skills: string[]): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/register`, { name, username, email, password, bio, skills })
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserId(id: string) {
    localStorage.setItem('userId', id);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  getAuthHeaders() {
    return { Authorization: `Bearer ${this.getToken()}` };
  }
}
