import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiServiceProtected } from '../../utils/services/api-service-protected'; 
import { ToonType } from '../../utils/types/toon-type';

@Component({
  selector: 'app-toon-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './toon-list.html',
  styleUrl: './toon-list.css'
})
export class ToonList  implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}
   private api = inject(ApiServiceProtected);
  toons: ToonType[] = [];
  loading = false;
  error: string | null = null;

ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
  const raw = localStorage.getItem('userId');
  const userId = raw ? Number(raw) : null;
  if (!userId) { this.error = 'Utilisateur non authentifié.'; return; }

  this.loading = true;
  this.api.listToonsByUser(userId).subscribe({
    next: (data) => { this.toons = data ?? []; this.loading = false; },
    error: () => { this.error = 'Impossible de charger vos toons.'; this.loading = false; }
  
  });
      }
}

  onSelectToon(toon: ToonType) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('selectedToonId', String(toon.id));
    }
    this.router.navigate(['/']);

  }

  trackById(_: number, t: ToonType) {
    return t.id;
  }
}
