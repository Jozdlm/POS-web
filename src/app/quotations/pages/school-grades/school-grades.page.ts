import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';

@Component({
  selector: 'app-school-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-grades.page.html',
  styleUrl: './school-grades.page.scss',
})
export class SchoolGradesComponent {
  public readonly schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();
}
