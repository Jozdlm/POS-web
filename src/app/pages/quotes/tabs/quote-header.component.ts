import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolGradeService } from '@app/features/quotes/school-grades/school-grade.service';
import { SchoolService } from '@app/features/quotes/educational-centers/school.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuotationStateService } from '@app/features/quotes/quotation-state.service';

@Component({
    selector: 'app-quote-header',
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <form
      autocomplete="off"
      [formGroup]="quoteHeaderForm"
      (ngSubmit)="onSubmitQuote()"
      class="mx-auto w-50"
    >
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="customer-field"
          placeholder=""
          formControlName="customerName"
        />
        <label for="customer-field">Cliente</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="date"
          class="form-control"
          id="date-field"
          placeholder=""
          formControlName="date"
        />
        <label for="date-field">Fecha</label>
      </div>
      <div class="form-floating mb-3">
        <select
          class="form-select"
          id="school-grade-field"
          formControlName="schoolGrade"
        >
          <option value="0">Escoge un grado</option>
          @for (op of schoolGrades$ | async; track op.id) {
            <option [value]="op.id">{{ op.name }}</option>
          }
        </select>
        <label for="school-grade-field">Grado Academico</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="school" formControlName="school">
          <option value="0">Escoge un centro educativo</option>
          @for (op of schools$ | async; track op.id) {
            <option [value]="op.id">{{ op.name }}</option>
          }
        </select>
        <label for="school">Centro Educativo</label>
      </div>
      <div class="form-floating mb-3">
        <select
          class="form-select"
          id="promotionType"
          formControlName="promotionType"
        >
          <option value="0">Escoge una promoción</option>
          <option value="1">Descuento (10%)</option>
          <option value="2">Forro de cuadernos</option>
        </select>
        <label for="promotionType">Promoción</label>
      </div>
      @if (diplayStudentControl) {
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="studentName"
            placeholder=""
            formControlName="studentName"
          />
          <label for="studentName">Estudiante</label>
        </div>
      }
      <div class="d-flex justify-content-end column-gap-2">
        <button
          type="button"
          class="btn btn-outline-secondary"
          (click)="onBackToPrevious()"
        >
          Regresar
        </button>
        <button type="submit" class="btn btn-primary" [disabled]="denyToSubmit">
          Continuar
        </button>
      </div>
    </form>
  `,
    styles: ``
})
export class QuoteHeaderComponent {
  private readonly _quoteState = inject(QuotationStateService);
  private readonly _router = inject(Router);
  public readonly _activatedRoute = inject(ActivatedRoute);
  public schools$ = inject(SchoolService).getSchools();
  public schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();

  public quoteHeaderForm = inject(QuotationStateService).quoteHeaderForm;

  public get diplayStudentControl(): boolean {
    return !this._quoteState.quoteWithDiscount();
  }

  public get denyToSubmit(): boolean {
    return !this._quoteState.quoteHeaderForm.valid;
  }

  public onBackToPrevious(): void {
    this._router.navigate(['../cart'], {
      relativeTo: this._activatedRoute,
    });
  }

  public onSubmitQuote(): void {
    this._router.navigate(['../confirmation'], {
      relativeTo: this._activatedRoute,
    });
  }
}
