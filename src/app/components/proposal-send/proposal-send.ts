import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProposalService, ProposalCreateResponse } from '../../services/proposal.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-proposal-send',
  imports: [CommonModule, FormsModule],
  templateUrl: './proposal-send.html',
  styleUrl: './proposal-send.scss',
})
export class ProposalSend {

  jobId!: string;

  price!: number;
  cover_letter: string = '';
  message: string = '';

  successMessage = '';
  errorMessage = '';

  constructor(
    private proposalService: ProposalService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.jobId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.price || (!this.cover_letter && !this.message)) {
      this.errorMessage = 'Price and cover letter/message are required.';
      return;
    }

    this.proposalService.submitProposal(
      this.jobId,
      this.price,
      this.cover_letter,
      this.message
    ).subscribe({
      next: (res: ProposalCreateResponse) => {
        this.cdr.detectChanges();
        this.successMessage = res.message;

        this.router.navigate(['/jobs', this.jobId]);

      },
      error: (err) => {
        this.cdr.detectChanges();
        this.errorMessage = err.error?.error || 'Something went wrong.';
      }
    });
  }
}
