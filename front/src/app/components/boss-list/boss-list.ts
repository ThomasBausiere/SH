import { Component, HostListener, Input, signal, Signal } from '@angular/core';
import { BossType } from '../../utils/types/boss-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boss-list',
  imports: [CommonModule],
  templateUrl: './boss-list.html',
  styleUrls: ['./boss-list.css'],
  standalone: true,
})
export class BossList {
  @Input() bossList: BossType[] = [];

  selectedBoss = signal<BossType | null>(null);

  openModal(boss: BossType) {
    this.selectedBoss.set(boss);
  }

  closeModal() {
    this.selectedBoss.set(null);
  }
  onOverlayClick(ev: MouseEvent) {
    if (ev.target === ev.currentTarget) this.closeModal();
  }

  /** Ferme avec la touche Échap */
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.selectedBoss()) this.closeModal();
  }
}
