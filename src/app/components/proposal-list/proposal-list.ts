import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
    private readonly proposalService: ProposalService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

 ngOnChanges() {
  if (this.jobId) {
    this.loadProposals();
  }
}


  loadProposals() {
    this.proposalService.getJobProposals(this.jobId).subscribe({
      next: (res) => {
        this.cdr.detectChanges();
        this.proposals = res;
      },
      error: (err) => {
        this.cdr.detectChanges();
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
