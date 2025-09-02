import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SkillType } from '../../utils/types/skill-type';

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

  listsBoss(id: number): void {
    this.showBossEvent.emit(id);
    console.log(id);
  }
  addToMyList(skill: any) {
    // logique plus tard – pour l’instant un placeholder
    console.log('TODO addToMyList:', skill);
  }
}
