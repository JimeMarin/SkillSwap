import { Component } from '@angular/core';
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

  constructor(private readonly platformService: PlatformService) {
    this.loadStats();
  }

  loadStats() {
    this.platformService.getStats().subscribe({
      next: (res) => {
        this.stats = res;
      },
      error: () => {
        this.errorMessage = 'Error loading platform statistics.';
      }
    });
  }
}
