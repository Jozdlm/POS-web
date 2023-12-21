import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';

@Component({
  selector: 'app-school-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-grades.component.html',
  styleUrl: './school-grades.component.scss',
})
export class SchoolGradesComponent {
  public readonly schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();
}
