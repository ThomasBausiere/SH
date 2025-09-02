import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillType } from '../types/skill-type';
import { BossType } from '../types/boss-type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private skillUrl = 'http://localhost:8080/api/skills';
  private bossUrl = 'http://localhost:8080/api/bosses';

  constructor(private http: HttpClient) {}

  getSkills(): Observable<SkillType[]> {
    return this.http.get<SkillType[]>(this.skillUrl);
  }
  getBosses(id: number): Observable<BossType[]>{
    return this.http.get<BossType[]>(this.bossUrl+"/by-skill" +`/${id}`);
  }
getSkillsBy(key: string): Observable<SkillType[]> {
  return this.http.get<SkillType[]>(
    `${this.skillUrl}/search`,
    { params: { q: key } } 
  );
  }

}
