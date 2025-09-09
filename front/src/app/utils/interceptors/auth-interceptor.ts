// auth-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const doc = inject(DOCUMENT);
  const ls = doc?.defaultView?.localStorage; 


  const isPublic = req.url.includes('/api/public/');
  const isPreflight = req.method === 'OPTIONS';
  if (isPublic || isPreflight) return next(req);

  const token = ls?.getItem('token') ?? null; 
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};