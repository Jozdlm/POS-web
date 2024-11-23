import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolService } from '@app/features/quotes/educational-centers/school.service';
import { RouterModule } from '@angular/router';
import { RecordStatusDirective } from '@app/ui/directives/record-status.directive';

@Component({
    selector: 'app-schools',
    imports: [CommonModule, RouterModule, RecordStatusDirective],
    template: `
    <div class="wrapper">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="fs-3">Centros Educativos</h1>
        <a class="btn btn-primary" routerLink="add">Crear colegio</a>
      </div>

      <div class="list-group">
        @for (item of schools$ | async; track item.id) {
          <div
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <p class="fw-medium fs-5 mb-0">
                {{ item.name }}
              </p>
              <span class="badge rounded-pill" [recordStatus]="item.isActive">
              </span>
            </div>
            <div>
              <a class="btn" [routerLink]="['edit', item.id]">Editar</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
    styleUrl: './educational-centers.page.scss'
})
export class EducationalCentersPage {
  public readonly schools$ = inject(SchoolService).getSchools();
}
