import { Routes } from '@angular/router';
import { MainContent } from './components/main-content/main-content';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Newtoon } from './components/newtoon/newtoon';
import { ToonList } from './components/toon-list/toon-list';

import { isLoggedGuard } from './utils/guards/is-logged-guard';
import { loginRedirect } from './utils/guards/loginRedirect';
import { isAdminGuard } from './utils/guards/is-admin.guard';
import { AdminPanel } from './components/admin-panel/admin-panel';

export const routes: Routes = [
    {path:"", component:MainContent},
    {path:"login", component:Login, canActivate: [loginRedirect]},
    {path:"register", component:Register,canActivate: [loginRedirect]},
    {path:"newToon", component:Newtoon, canActivate: [isLoggedGuard]},
    {path:"showToons", component:ToonList, canActivate: [isLoggedGuard]},
    { path: 'admin', component: AdminPanel, canActivate: [isLoggedGuard, isAdminGuard] },
    { path: '**', redirectTo: '' },
];
