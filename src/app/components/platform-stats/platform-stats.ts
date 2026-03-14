import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService, PlatformStats } from '../../services/platform.service';

@Component({
  selector: 'app-platform-stats',
  imports: [CommonModule],
  templateUrl: './platform-stats.html',
  styleUrl: './platform-stats.scss',
})
export class PlatformStatsComponent {
  stats: PlatformStats | null = null;
  errorMessage = '';

  constructor(
    private readonly platformService: PlatformService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadStats();
  }

  loadStats() {
    this.platformService.getStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
        this.errorMessage = 'Error loading platform statistics.';
      }
    });
  }
}
