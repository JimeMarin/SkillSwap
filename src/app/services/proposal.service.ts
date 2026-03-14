import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface Proposal {
  id: string;
  job_id: string;
  freelancer_id: string;
  price: number;
  cover_letter?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ProposalCreateResponse {
  message: string;
  proposal_id: string;
}

export interface ProposalActionResponse {
  message: string;
}

export interface ProposalDeleteResponse {
  message: string;
}


@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {}

  getProposalById(id: string): Observable<Proposal> {
  return this.http.get<Proposal>(
    `${this.BASE_URL}/proposals/${id}`,
    { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }

  submitProposal(job_id: string, price: number, cover_letter?: string, message?: string): Observable<ProposalCreateResponse> {
    return this.http.post<ProposalCreateResponse>(
      `${this.BASE_URL}/jobs/${job_id}/proposals`,
      { price, cover_letter, message },
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }

  getJobProposals(job_id: string): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(
      `${this.BASE_URL}/jobs/${job_id}/proposals`,
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }

  acceptProposal(id: string): Observable<ProposalActionResponse> {
    return this.http.patch<ProposalActionResponse>(
      `${this.BASE_URL}/proposals/${id}/accept`,
      {},
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }

  getMyBids(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(
      `${this.BASE_URL}/proposals/my-bids`,
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }

  deleteProposal(id: string): Observable<ProposalDeleteResponse> {
    return this.http.delete<ProposalDeleteResponse>(
      `${this.BASE_URL}/proposals/${id}`,
      { headers: new HttpHeaders(this.auth.getAuthHeaders()) }
    );
  }
}
