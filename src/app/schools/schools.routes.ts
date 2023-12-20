import { Routes } from '@angular/router';
import { SchoolsComponent } from './pages/schools/schools.component';

const SCHOOL_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: SchoolsComponent },
  { path: '**', redirectTo: '' },
];

export default SCHOOL_ROUTES;
