import { Routes } from '@angular/router';
import { SchoolFormComponent } from './pages/school-form/school-form.component';

const SCHOOL_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/quotations/educational-centers' },
  { path: 'add', component: SchoolFormComponent },
  { path: 'edit/:id', component: SchoolFormComponent },
  { path: '**', redirectTo: '' },
];

export default SCHOOL_ROUTES;
