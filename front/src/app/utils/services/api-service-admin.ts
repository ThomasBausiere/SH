import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from '../types/user-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceAdmin {

    private baseUrl = "http://localhost:8080/api/admin"

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
  
}
