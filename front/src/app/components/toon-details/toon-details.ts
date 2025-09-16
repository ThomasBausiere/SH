import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiServiceProtected } from '../../utils/services/api-service-protected';
import { ToonType } from '../../utils/types/toon-type';

@Component({
  selector: 'app-toon-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toon-details.html',
  styleUrl: './toon-details.css',
})
export class ToonDetails implements OnInit {
  private api = inject(ApiServiceProtected);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loading = false;
  error: string | null = null;
  toon: ToonType | null = null;            // ← ce qu’on affichera
  selectedToonId: number | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const raw = localStorage.getItem('selectedToonId');
    this.selectedToonId = raw ? Number(raw) : null;
    if (!this.selectedToonId || Number.isNaN(this.selectedToonId)) {
      this.error = 'Aucun toon sélectionné.';
      return;
    }

    this.loading = true;
    this.api.getToon(this.selectedToonId).subscribe({
      next: (t) => { this.toon = t; this.loading = false; },
      error: () => { this.error = 'Impossible de charger le toon.'; this.loading = false; }
    });
  }
}
