import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiServicePublic } from '../services/api-service-public';

export const loginRedirect: CanActivateFn = () => {
  const api = inject(ApiServicePublic);
  const router = inject(Router);
  const token = api.getToken();

  return token ? router.createUrlTree(['/']) : true;
};
