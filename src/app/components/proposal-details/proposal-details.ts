import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Proposal, ProposalService } from '../../services/proposal.service';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-proposal-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './proposal-details.html',
  styleUrl: './proposal-details.scss',
})
export class ProposalDetailsComponent {
  proposalId = '';
  proposal: Proposal | null = null;
  errorMessage = '';
  isFreelancer = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly proposalService: ProposalService,
    private readonly cdr: ChangeDetectorRef,
    private readonly auth: Auth
  ) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.proposalId = id;

    this.loadProposal();
  }

  loadProposal() {
    this.proposalService.getProposalById(this.proposalId).subscribe({
      next: (res) => {
        this.proposal = res;
        
        const currentUserId = this.auth.getUserId() ?? '';
        this.isFreelancer = res.freelancer_id === currentUserId;

        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Proposal not found.';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
        this.cdr.detectChanges();
      }
    });
  }

  accept() {
    if (!confirm('Do you want to accept this proposal?')) {
      return;
    }

    this.proposalService.acceptProposal(this.proposalId).subscribe({
      next: () => {
        alert('Proposal accepted!');
        this.loadProposal();
      },
      error: (err) => {
        alert(err.error?.error || 'Error accepting proposal.');
      }
    });
  }

  deleteProposal() {
  if (!this.proposal) return;

  if (!confirm('Do you want to delete this proposal?')) {
    return;
  }

  this.proposalService.deleteProposal(this.proposalId).subscribe({
    next: (res) => {
      alert(res.message);

      setTimeout(() => {
        this.router.navigate(['/proposals/my-bids']);
      }, 800);
    },
    error: (err) => {
      alert(err.error?.error || 'Error deleting proposal.');
    }
  });
}

}
