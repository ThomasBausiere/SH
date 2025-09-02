import { Component, OnDestroy, OnInit } from '@angular/core';
import { BossList } from '../boss-list/boss-list';
import { SearchBar } from '../search-bar/search-bar';
import { SkillsList } from '../skills-list/skills-list';
import { SkillsDetails } from '../skills-details/skills-details';
import { ApiService } from '../../utils/services/api-service';
import { SkillType } from '../../utils/types/skill-type';
import { BossType } from '../../utils/types/boss-type';

@Component({
  selector: 'app-main-content',
  imports: [BossList, SearchBar, SkillsList, SkillsDetails],
  templateUrl: './main-content.html',
  styleUrls: ['./main-content.css'],
})
export class MainContent implements OnInit, OnDestroy {
  viewMode: 'skill-detail' | 'boss-list' = 'skill-detail';

  skillsList: SkillType[] = [];
  bossList: BossType[] = [];
  idSkill: number = 6;
  receiveData!: string;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch des skills au démarrage
    this.apiService.getSkills().subscribe({
      next: (allSkills) => (this.skillsList = allSkills),
      error: (err) => console.error(err),
    });

    // Fetch des boss initiaux
    this.loadBosses(this.idSkill);
  }

  ngOnDestroy(): void {}

  handleSearch(search: string): void {
    this.apiService.getSkillsBy(search).subscribe({
      next: (list) => (this.skillsList = list),
      error: console.error,
    });
  }
  handleData(skillId: number): void {
    this.idSkill = skillId;
    this.loadBosses(skillId);
    this.viewMode = 'boss-list';
  }

  private loadBosses(skillId: number): void {
    this.apiService.getBosses(skillId).subscribe({
      next: (bosses) => (this.bossList = bosses),
      error: (err) => console.error(err),
    });
  }
}
