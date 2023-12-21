import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolService } from '@app/schools/services/school.service';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss',
})
export class SchoolsComponent {
  public readonly schools$ = inject(SchoolService).getSchools();
}
