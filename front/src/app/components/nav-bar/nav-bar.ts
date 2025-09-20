import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiServicePublic } from '../../utils/services/api-service-public';
import { ApiServiceProtected } from '../../utils/services/api-service-protected';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  private apiPublic = inject(ApiServicePublic);
  private api = inject(ApiServiceProtected);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isLogged = false;
  isAdmin = false;
  isBrowser = false;

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Pas d'accès direct à localStorage :
    this.isLogged = this.apiPublic.isAuthenticated(); // lit token de manière safe

    if (this.isLogged) {
      // Récupère le rôle côté back (source de vérité)
      this.api.me().subscribe({
        next: (me) => (this.isAdmin = me.role === 'ADMIN'),
        error: () => (this.isAdmin = false),
      });
    }
  }

  logout() {
    this.apiPublic.logout();
    this.isLogged = false;
    this.isAdmin = false;
  }

  get token(): string | null {
    return this.apiPublic.getToken(); 
  }
}
