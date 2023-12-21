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
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { SchoolGradeService } from '../../../schools/services/school-grade.service';
import { QuotationStateService } from '../../services/quotation-state.service';
import { Product } from '@app/quotations/models/product';
import { QuotationItem } from '@app/quotations/models/quotation-item';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { ProductService } from '@app/catalog/services/product.service';
import { getCurrentDate } from '@app/quotations/utils/current-date';
import { SchoolService } from '@app/schools/services/school.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
  public quotationItems$ = this._quotationState.items$;
  public totalAmmount$ = this._quotationState.ammount$;

  public quotationInfo = this._formBuilder.nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    studentName: ['', [Validators.required, Validators.minLength(3)]],
    date: [getCurrentDate(), Validators.required],
    schoolGrade: ['', [Validators.required, Validators.min(1)]],
    schoolName: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor() {
    this.subscribeToSearchChanges();
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
      this._quotationState.clearQuotationState();
    });
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
            return this._productService.getProductsBy(value, 'name');
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
    const quotationHeader = this.quotationInfo.getRawValue();
    const quotationSnapshot = this._quotationState.getStateSnapshot();

    this._quotationService.createQuotation({
      ...quotationHeader,
      schoolGrade: parseInt(quotationHeader.schoolGrade),
      items: quotationSnapshot.items,
      totalAmmount: quotationSnapshot.totalAmmount,
    });
  }
}
