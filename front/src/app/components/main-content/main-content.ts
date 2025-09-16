import { Component, OnDestroy, OnInit } from '@angular/core';
import { BossList } from '../boss-list/boss-list';
import { SearchBar } from '../search-bar/search-bar';
import { SkillsList } from '../skills-list/skills-list';
import { SkillType } from '../../utils/types/skill-type';
import { BossType } from '../../utils/types/boss-type';
import { ApiServicePublic } from '../../utils/services/api-service-public';
import { ToonDetails } from "../toon-details/toon-details";

@Component({
  selector: 'app-main-content',
  imports: [BossList, SearchBar, SkillsList, ToonDetails],
  templateUrl: './main-content.html',
  styleUrls: ['./main-content.css'],
})
export class MainContent implements OnInit, OnDestroy {
  viewMode: 'skill-detail' | 'boss-list' = 'skill-detail';

  skillsList: SkillType[] = [];
  bossList: BossType[] = [];
  idSkill: number = 1;
  receiveData!: string;

  constructor(private apiService: ApiServicePublic) {}

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
