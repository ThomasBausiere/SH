import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiServicePublic } from '../services/api-service-public';

export const loginRedirect: CanActivateFn = (route, state) => {
  const apiService = inject(ApiServicePublic)
  const router = inject(Router)
  const token = apiService.getToken()

  if(token) {
    router.navigate(["/dashboard"])
    return false
  }

  return true;
};