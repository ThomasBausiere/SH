import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../types/user-type';
import { ToonCreateRequest, ToonRenameRequest, ToonType } from '../types/toon-type';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceProtected {
  private baseUrl = "http://localhost:8080/api/private";

  constructor(private http: HttpClient){}

  getToken(): string | null{
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

    getUser(id : bigint): Observable<UserType>{
    return this.http.get<UserType>(this.baseUrl + '/user/' + id)
  }

  listToonsByUser(userId: number): Observable<ToonType[]> {
    return this.http.get<ToonType[]>(`${this.baseUrl}/toons/user/${userId}`);
  }

  createToonForUser(userId: number, body: ToonCreateRequest): Observable<ToonType> {
    return this.http.post<ToonType>(`${this.baseUrl}/toons/user/${userId}`, body);
  }

  getToon(id: number): Observable<ToonType> {
    return this.http.get<ToonType>(`${this.baseUrl}/toons/${id}`);
  }

  renameToon(id: number, body: ToonRenameRequest): Observable<ToonType> {
    return this.http.patch<ToonType>(`${this.baseUrl}/toons/${id}/name`, body);
  }

  deleteToon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/toons/${id}`);
  }

  addSkillToon(id: number, skillId: number): Observable<ToonType> {
    return this.http.post<ToonType>(`${this.baseUrl}/toons/${id}/skills/${skillId}`, {});
  }

  removeSkillToon(id: number, skillId: number): Observable<ToonType> {
    return this.http.delete<ToonType>(`${this.baseUrl}/toons/${id}/skills/${skillId}`);
  }

  updateUser(id: number, payload: { email: string; pseudo: string }) {
  return this.http.post(`/api/private/user/${id}`, payload);
}

updatePassword(id: number, payload: { password: string }) {
  return this.http.post(`/api/private/user/${id}/updatepass`, payload);
}
  
}
