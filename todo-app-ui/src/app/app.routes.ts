import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  }
];
