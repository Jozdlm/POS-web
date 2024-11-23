import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolGradeService } from '@app/features/quotes/school-grades/school-grade.service';

@Component({
    selector: 'app-school-grades',
    imports: [CommonModule],
    template: `
    <div class="wrapper">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="fs-3">Grados Académicos</h1>
      </div>

      <div class="list-group">
        @for (item of schoolGrades$ | async; track item.id) {
          <div
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <p class="fw-medium fs-5 mb-0">
                {{ item.name }}
              </p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
    styleUrl: './school-grades.page.scss'
})
export class SchoolGradesPage {
  private readonly _gradeService = inject(SchoolGradeService);
  public schoolGrades$ = this._gradeService.getSchoolGrades();
}
