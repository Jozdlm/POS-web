import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { Product } from '@app/catalog/models/product';
import { QuotationItem } from '@app/quotations/models/quotation-item';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { ProductService } from '@app/catalog/services/product.service';
import { getCurrentDate } from '@app/quotations/utils/current-date';
import { SchoolService } from '@app/schools/services/school.service';
import { IconComponent } from '@app/common/components/icon.component';
import { QuoteMutation } from '@app/quotations/models/quotation';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IconComponent],
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.scss',
})
export class AddQuotationComponent {
  private readonly _quotationState = inject(QuotationStateService);
  private readonly _quotationService = inject(QuotationService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _productService = inject(ProductService);
  private _subscriptions = new Subscription();
  public readonly schools$ = inject(SchoolService).getSchools();
  public readonly schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();
  public searchControl = new FormControl('');
  public filteredProducts: Product[] = [];
  public quoteState$ = this._quotationState.quoteState$;
  private _promotionState = new BehaviorSubject<boolean>(false);
  public readonly displayStudentControl = this._promotionState.asObservable();

  public tabItems: string[] = ['Carrito', 'Datos del cliente', 'Confirmación'];
  public currentTab: string = 'Carrito';

  public quotationInfo = this._formBuilder.nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    studentName: ['', [Validators.required, Validators.minLength(3)]],
    date: [getCurrentDate(), Validators.required],
    schoolGrade: [0, [Validators.required, Validators.min(1)]],
    school: [0, [Validators.required, Validators.min(1)]],
    promotionType: [0, [Validators.required, Validators.min(1)]],
  });

  public setCurrentTab(tab: string): void {
    this.currentTab = tab;
  }

  constructor() {
    this.subscribeToSearchChanges();
    this.subscribeToPromotionControl();
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
      this._quotationState.clearQuotationState();
    });
  }

  private subscribeToPromotionControl(): void {
    this._subscriptions.add(
      this.quotationInfo.controls.promotionType.valueChanges.subscribe(
        (value) => {
          if (value * 1 === 2) {
            this._promotionState.next(true);
            this._quotationState.removeDiscount();
          } else if (value * 1 === 1) {
            this._promotionState.next(false);
            this._quotationState.addDiscount();
          } else {
            this._promotionState.next(false);
            this._quotationState.removeDiscount();
          }
        },
      ),
    );
  }

  private subscribeToSearchChanges(): void {
    this._subscriptions.add(
      this.searchControl.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          filter((value) => typeof value === 'string'),
          map((value) => value as string),
          switchMap((value) => {
            return this._productService.getProductsBy({
              query: value,
              field: 'name',
              limit: 5,
            });
          }),
        )
        .subscribe((items) => {
          this.filteredProducts = items;
        }),
    );
  }

  public addItemToQuotation(item: Product): void {
    const quotationItem: QuotationItem = {
      productId: item.id,
      description: item.name,
      quantity: 1,
      price: item.sellingPrice,
      discount: 0,
      ammount: item.sellingPrice,
    };

    this._quotationState.addItem(quotationItem);
  }

  public removeItemOfQuotation(itemId: number): void {
    this._quotationState.removeItem(itemId);
  }

  public increaseQuantity(itemId: number): void {
    this._quotationState.increaseQuantity(itemId);
  }

  public decreaseQuantity(itemId: number): void {
    this._quotationState.decreaseQuantity(itemId);
  }

  public clearSearchControl(): void {
    this.searchControl.reset();
    this.filteredProducts = [];
  }

  public updateItemPrice(event: Event, itemId: number): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const sellinPrice = parseFloat(inputValue);

    this._quotationState.updateSellingPrice(itemId, sellinPrice);
  }

  public createQuotation(): void {
    const raw = this.quotationInfo.getRawValue();
    const snapshot = this._quotationState.getStateSnapshot();

    const quote: QuoteMutation = {
      customerName: raw.customerName,
      studentName: raw.studentName,
      date: raw.date,
      gradeId: raw.schoolGrade,
      schoolId: raw.school,
      totalAmmount: snapshot.totalAmmount,
      promotionId: raw.promotionType,
    };
    const items: QuotationItem[] = snapshot.items;

    this._quotationService.createQuotation(quote, items);
  }
}
