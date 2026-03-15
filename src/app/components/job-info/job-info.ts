import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { JobDetails, JobServices } from '../../services/job-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ProposalService } from '../../services/proposal.service';
import { ProposalList } from '../proposal-list/proposal-list';
import { ReviewList } from '../review-list/review-list';
import { ReviewSend } from '../review-send/review-send';

@Component({
  selector: 'app-job-info',
  imports: [CommonModule, RouterLink, ProposalList, ReviewList, ReviewSend],
  templateUrl: './job-info.html',
  styleUrl: './job-info.scss',
})
export class JobInfo {
  job: JobDetails | null = null;
  errorMessage = '';

  isOwner = false;
  isFreelancer = false;
  hasPendingProposal = false;


  constructor(
    private readonly jobService: JobServices,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: Auth,
    private readonly cdr: ChangeDetectorRef,
    private readonly proposalService: ProposalService
  ) {
    this.loadJob();
  }

  loadJob() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.jobService.getJobById(id).subscribe({
      next: (res) => {
        this.job = res;
        const currentUserId = this.authService.getUserId() ?? '';

        this.isOwner =
          !!currentUserId &&
          res.owner_id?.toString() === currentUserId.toString();

        this.isFreelancer =
          !!currentUserId &&
          res.freelancer_id?.toString() === currentUserId.toString();
        
        if (this.isOwner) {
          this.proposalService.getJobProposals(id).subscribe((proposals) => {
            this.hasPendingProposal = proposals.some(
              (p) =>
                p.status === 'pending'
            );
            this.cdr.detectChanges();
          });
        }

        else if (currentUserId) {
          this.proposalService.getMyBids().subscribe((myProposals) => {
            this.hasPendingProposal = myProposals.some(
              (p) =>
                p.job_id?.toString() === id.toString() &&
                p.status === 'pending'
            );
            this.cdr.detectChanges();
          });
        }
      },

  error: (err) => {
    this.errorMessage = err.message; 
    this.cdr.detectChanges();   
    this.router.navigate(['/jobs/search']);
    } 
  });
  }
}

