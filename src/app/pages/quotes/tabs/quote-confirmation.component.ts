import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationStateService } from '@app/features/quotes/quotation-state.service';
import { QuotationService } from '@app/features/quotes/quotation.service';
import { QuoteMutation } from '@app/features/quotes/quotation';
import { SchoolService } from '@app/features/quotes/educational-centers/school.service';
import { SchoolGradeService } from '@app/features/quotes/school-grades/school-grade.service';
import { PromotionTypeService } from '@app/features/quotes/promotion-types/promotion-type.service';
import { Router } from '@angular/router';
import { combineLatestWith } from 'rxjs';

@Component({
    selector: 'app-quote-confirmation',
    imports: [CommonModule],
    template: `
    <div class="quote-details">
      <div>
        <p class="fw-medium mb-3">Detalles</p>

        <div class="mb-3 small-text">
          <div class="d-flex justify-content-between">
            <span>Fecha:</span>
            <span>{{ quoteState().date }}</span>
          </div>

          <div class="d-flex justify-content-between">
            <span>Cliente:</span>
            <span>{{ quoteState().customerName }}</span>
          </div>
        </div>

        <div class="mb-3 small-text">
          <div class="d-flex justify-content-between">
            <span>Colegio:</span>
            <span>{{ schoolName }}</span>
          </div>

          <div class="d-flex justify-content-between">
            <span>Grado:</span>
            <span>{{ gradeName }}</span>
          </div>
        </div>

        <div class="small-text">
          <div class="d-flex justify-content-between">
            <span>Promoción:</span>
            <span>{{ promoDescription }}</span>
          </div>

          <div class="d-flex justify-content-between">
            <span>Estudiante:</span>
            <span>{{ quoteState().studentName }}</span>
          </div>
        </div>
      </div>

      <div>
        <p class="mb-3 fw-medium">Resumen:</p>
        <div class="list-group">
          @for (item of quoteState().items; track $index) {
            <div
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="me-4 small-text text-truncate">
                {{ item.quantity }} x {{ item.description }}
              </div>
              <span class="badge bg-primary rounded-pill">{{
                item.ammount | currency: 'GTQ'
              }}</span>
            </div>
          }
        </div>

        <hr />

        <div class="mb-3">
          <div class="mb-1 d-flex justify-content-between small-text">
            <span>Subtotal:</span>
            <span>{{ quoteState().subtotal | currency: 'GTQ' }}</span>
          </div>
          <div class="mb-3 d-flex justify-content-between small-text">
            <span>Descuento:</span>
            <span>{{ quoteState().discount | currency: 'GTQ' }}</span>
          </div>
          <div class="d-flex justify-content-between fw-medium total-label">
            <span>TOTAL:</span>
            <span>{{ quoteState().total | currency: 'GTQ' }}</span>
          </div>
        </div>

        <div class="d-grid">
          <button (click)="onCreateQuote()" class="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
    </div>
  `,
    styles: `
    .quote-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 38px;
    }

    .total-label {
      font-size: 18px;
    }
  `
})
export class QuoteConfirmationComponent implements OnInit {
  private readonly _stateService = inject(QuotationStateService);
  private readonly _quoteService = inject(QuotationService);
  private readonly _router = inject(Router);
  private readonly schoolService = inject(SchoolService);
  private readonly gradeService = inject(SchoolGradeService);
  private readonly promoService = inject(PromotionTypeService);
  public readonly quoteState = this._stateService.quoteState;
  public schoolName: string = '';
  public gradeName: string = '';
  public promoDescription: string = '';

  ngOnInit(): void {
    const { school, schoolGrade, promotionType } = this.quoteState();

    this.schoolService
      .getSchoolById(school)
      .pipe(
        combineLatestWith(
          this.gradeService.getGradeById(schoolGrade),
          this.promoService.getPromotionById(promotionType),
        ),
      )
      .subscribe(([school, schoolGrade, promotionType]) => {
        this.schoolName = school.name;
        this.gradeName = schoolGrade.name;
        this.promoDescription = promotionType.description;
      });
  }

  public onCreateQuote(): void {
    const header: QuoteMutation = {
      customerName: this.quoteState().customerName,
      studentName: this.quoteState().studentName,
      date: this.quoteState().date,
      gradeId: this.quoteState().schoolGrade,
      schoolId: this.quoteState().school,
      promotionId: this.quoteState().promotionType,
      totalAmmount: this.quoteState().total,
    };

    const items = this.quoteState().items;

    this._quoteService.createQuoteWithItems(header, items).subscribe((res) => {
      this._router.navigateByUrl('/quotations');
    });
  }
}
