import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proposal, ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-proposal-list',
  imports: [CommonModule],
  templateUrl: './proposal-list.html',
  styleUrl: './proposal-list.scss',
})
export class ProposalList {

   @Input() jobId!: string;

  proposals: Proposal[] = [];
  errorMessage = '';

  constructor(
    private readonly proposalService: ProposalService
  ) {
  }

  ngOnInit() {
    this.loadProposals();
  }

  loadProposals() {
    this.proposalService.getJobProposals(this.jobId).subscribe({
      next: (res) => {
        this.proposals = res;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error loading proposals.';
      }
    });
  }
  
  acceptProposal(proposalId: string) {
    if (!confirm('Do you want to accept this proposal?')) {
      return;
    }

    this.proposalService.acceptProposal(proposalId).subscribe({
    next: () => {
      alert('Proposal accepted!');
      this.loadProposals();
    },
    error: (err) => {
        alert(err.error?.error || 'Error accepting proposal.');
      }
    });

  }
}
