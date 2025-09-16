// auth-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isPublic = req.url.includes('/api/public/');
  const isPreflight = req.method === 'OPTIONS';
  if (isPublic || isPreflight) return next(req);

  const token = (typeof localStorage !== 'undefined')
    ? localStorage.getItem('token')
    : null;

  if (token) {
    console.debug('[authInterceptor] Attaching Authorization header');
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }else {
  console.debug('[authInterceptor] No token found');
}
  return next(req);
};