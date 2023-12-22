import { Routes } from '@angular/router';
import { SchoolsComponent } from './pages/schools/schools.component';
import { SchoolFormComponent } from './pages/school-form/school-form.component';

const SCHOOL_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: SchoolsComponent },
  { path: 'add', component: SchoolFormComponent },
  { path: 'edit/:id', component: SchoolFormComponent },
  { path: '**', redirectTo: '' },
];

export default SCHOOL_ROUTES;
