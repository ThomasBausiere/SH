import { SkillType } from './skill-type';

export type BossType = {
  id: number;
  name: string;
  profession: string;
  campaign: string;
  position: string;
  urlPosition: string;
  condition: string;
  eliteSkill: SkillType;
};
