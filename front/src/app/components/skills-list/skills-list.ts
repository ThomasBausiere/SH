import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
} from '@angular/core';
import { SkillType } from '../../utils/types/skill-type';
import { ApiServicePublic } from '../../utils/services/api-service-public';
import { ApiServiceProtected } from '../../utils/services/api-service-protected';
import { ToonType } from '../../utils/types/toon-type';

@Component({
  selector: 'app-skills-list',
  imports: [],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.css',
  standalone: true,
})
export class SkillsList implements OnInit {
  @Input() skillsList!: SkillType[];
  @Output() showBossEvent = new EventEmitter<number>();
  @Output() ownershipChange = new EventEmitter<{ skillId: number; owned: boolean }>();

  apipublic = inject(ApiServicePublic);
  apiProtected = inject(ApiServiceProtected);

  selectedToonId: number | null = null;

  ownedSkillIds = new Set<number>();
  loadingSkillIds = new Set<number>();

ngOnInit(): void {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('selectedToonId') : null;
  this.selectedToonId = raw ? Number(raw) : null;

  if (this.selectedToonId && !Number.isNaN(this.selectedToonId)) {
    this.loadToonSkills(this.selectedToonId);
  }

  // écouter un changement ultérieur (ex: depuis la liste de toons)
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', this.onStorageChange);
  }
}

  ngOnDestroy(): void {
  if (typeof window !== 'undefined') {
    window.removeEventListener('storage', this.onStorageChange);
  }
}

private onStorageChange = (e: StorageEvent) => {
  if (e.key === 'selectedToonId') {
    const raw = localStorage.getItem('selectedToonId');
    const id = raw ? Number(raw) : null;
    this.selectedToonId = id;
    if (id && !Number.isNaN(id)) {
      this.loadToonSkills(id);
    } else {
      this.ownedSkillIds.clear();
    }
  }
};

private loadToonSkills(toonId: number) {
  this.apiProtected.getToon(toonId).subscribe({
    next: (toon: ToonType) => {
      console.log('Toon chargé depuis l’API :', toon);
      const ids = (toon?.skills ?? []).map(s => s.id);
      this.ownedSkillIds = new Set(ids);
    },
    error: (err) => console.error('Impossible de charger le Toon sélectionné', err),
  });
}

  hasSkill(skillId: number): boolean {
    return this.ownedSkillIds.has(skillId);
  }

  /** handler checkbox */
  onToggleSkill(skill: SkillType, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (!this.selectedToonId) {
      console.warn('Aucun Toon sélectionné dans la session.');
      return;
    }
    if (!this.token) {
      console.warn('Utilisateur non authentifié.');
      return;
    }
    if (this.loadingSkillIds.has(skill.id)) return;

    this.loadingSkillIds.add(skill.id);
    const done = () => this.loadingSkillIds.delete(skill.id);

    if (checked) {
      this.addSkillToToon(skill.id, done);
    } else {
      this.removeSkillFromToon(skill.id, done);
    }
  }

  /** ADD */
private addSkillToToon(skillId: number, finalize: () => void): void {
    if (!this.selectedToonId) { finalize(); return; }

    this.ownedSkillIds.add(skillId); // optimistic

    this.apiProtected.addSkillToon(this.selectedToonId, skillId).subscribe({
      next: () => {
        // informe le parent -> il pourra appliquer les filtres (hideOwned / ownedOnly)
        this.ownershipChange.emit({ skillId, owned: true });            // 👈 NEW
        finalize();
      },
      error: (err) => {
        console.error('Ajout skill échoué', err);
        this.ownedSkillIds.delete(skillId); // rollback
        finalize();
      },
    });
  }

  private removeSkillFromToon(skillId: number, finalize: () => void): void {
    if (!this.selectedToonId) { finalize(); return; }

    const had = this.ownedSkillIds.delete(skillId); // optimistic

    this.apiProtected.removeSkillToon(this.selectedToonId, skillId).subscribe({
      next: () => {
        this.ownershipChange.emit({ skillId, owned: false });            
        finalize();
      },
      error: (err) => {
        console.error('Suppression skill échouée', err);
        if (had) this.ownedSkillIds.add(skillId); // rollback
        finalize();
      },
    });
  }
  listsBoss(id: number): void {
    this.showBossEvent.emit(id);
    console.log(id);
  }

  get token(): string | null {
    return this.apipublic.getToken();
  }
}
