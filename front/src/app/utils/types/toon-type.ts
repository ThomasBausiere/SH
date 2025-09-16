import { SkillType } from './skill-type';

export type ToonType = {
  id: number;
  name: string;
  profession: string;
  skills: SkillType[];
  ownerId?: number | bigint;
};

export type ToonCreateRequest = {
  name: string;
  profession: string; 
};

export type ToonRenameRequest = {
  name: string;
};
