import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proposal, ProposalService } from '../../services/proposal.service'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proposal-my-bids',
  imports: [CommonModule, RouterLink],
  templateUrl: './proposal-my-bids.html',
  styleUrl: './proposal-my-bids.scss',
})
export class ProposalMyBidsComponent {
  proposals: Proposal[] = [];
  errorMessage = '';

  constructor(
    private readonly proposalService: ProposalService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadMyProposals();
  }

  loadMyProposals() {
    this.proposalService.getMyBids().subscribe({
      next: (res) => {
        this.proposals = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error loading your proposals.';
        this.cdr.detectChanges();
      }
    });
  }

  deleteProposal(id: string) {
  if (!confirm('Do you want to delete this proposal?')) {
    return;
  }

  this.proposalService.deleteProposal(id).subscribe({
    next: (res) => {
      alert(res.message);
      this.loadMyProposals();
    },
    error: (err) => {
      alert(err.error?.error || 'Error deleting proposal.');
    }
  });
}



}
