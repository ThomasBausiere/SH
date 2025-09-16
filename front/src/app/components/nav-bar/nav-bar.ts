import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiServicePublic } from '../../utils/services/api-service-public';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
  standalone:true
})
export class NavBar {
  apiService = inject(ApiServicePublic)

    logout() {
    this.apiService.logout();
  }

  get token(): string | null{
    return this.apiService.getToken();
  }

}
