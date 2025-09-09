import { Routes } from '@angular/router';
import { MainContent } from './components/main-content/main-content';
import { Login } from './components/login/login';
import { register } from 'module';
import { Register } from './components/register/register';

export const routes: Routes = [
    {path:"", component:MainContent},
    {path:"login", component:Login},
    {path:"register", component:Register}
];
