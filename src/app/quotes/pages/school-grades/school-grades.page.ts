import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolGradeService } from '@app/quotes/school-grades/school-grade.service';

@Component({
  selector: 'app-school-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-grades.page.html',
  styleUrl: './school-grades.page.scss',
})
export class SchoolGradesPage {
  public readonly schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();
}
