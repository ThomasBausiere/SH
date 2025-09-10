import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { SkillType } from '../../utils/types/skill-type';
import { ApiServicePublic } from '../../utils/services/api-service-public';

@Component({
  selector: 'app-skills-list',
  imports: [],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.css',
  standalone: true,
})
export class SkillsList {
  @Input() skillsList!: SkillType[];

  @Output() showBossEvent = new EventEmitter<number>();

  apipublic =  inject(ApiServicePublic);

  listsBoss(id: number): void {
    this.showBossEvent.emit(id);
    console.log(id);
  }
  addToMyList(skill: any) {
    // logique plus tard – pour l’instant un placeholder
    console.log('TODO addToMyList:', skill);
  }

  get token():string | null{
    return this.apipublic.getToken();
  }
  
}
