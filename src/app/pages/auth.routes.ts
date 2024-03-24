import { Routes } from '@angular/router';
import { LoginPage } from './auth/login.page';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export default AUTH_ROUTES;
