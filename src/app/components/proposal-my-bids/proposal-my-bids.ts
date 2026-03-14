import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proposal, ProposalService } from '../../services/proposal.service'; 

@Component({
  selector: 'app-proposal-my-bids',
  imports: [CommonModule],
  templateUrl: './proposal-my-bids.html',
  styleUrl: './proposal-my-bids.scss',
})
export class ProposalMyBidsComponent {
  proposals: Proposal[] = [];
  errorMessage = '';

  constructor(
    private readonly proposalService: ProposalService
  ) {
    this.loadMyProposals();
  }

  loadMyProposals() {
    this.proposalService.getMyBids().subscribe({
      next: (res) => {
        this.proposals = res;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error loading your proposals.';
      }
    });
  }


}
