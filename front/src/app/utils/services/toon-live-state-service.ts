import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToonLiveStateService {
  // Id du toon sélectionné (ou null si visiteur)
  readonly selectedToonId$ = new BehaviorSubject<number | null>(null);

  // Nombre de skills possédés pour le toon courant (0 par défaut)
  readonly ownedCount$ = new BehaviorSubject<number>(0);

  setSelectedToon(id: number | null) {
    this.selectedToonId$.next(id);
  }

  setOwnedCount(n: number) {
    this.ownedCount$.next(n ?? 0);
  }

  // helpers pour réactions immédiates
  incOwned() { this.ownedCount$.next(this.ownedCount$.value + 1); }
  decOwned() { this.ownedCount$.next(Math.max(0, this.ownedCount$.value - 1)); }
}
