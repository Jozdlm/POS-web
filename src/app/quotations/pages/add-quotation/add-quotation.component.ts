import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { SchoolGradeService } from '../../services/school-grade.service';
import { SchoolGrade } from '../../models/school-grades';
import { QuotationStateService } from '../../services/quotation-state.service';
import { Product } from '@app/quotations/models/product';
import { QuotationItem } from '@app/quotations/models/quotation-item';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.scss',
})
export class AddQuotationComponent {
  private readonly _supabaseService = inject(SupabaseService);
  private readonly _schoolGradeService = inject(SchoolGradeService);
  private readonly _quotationState = inject(QuotationStateService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _supabase = this._supabaseService.supabase;
  private _subscriptions = new Subscription();
  public searchControl = new FormControl('');
  public filteredProducts: Product[] = [];
  public schoolGrades: SchoolGrade[] = [];
  public quotationItems$ = this._quotationState.items$;
  public totalAmmount$ = this._quotationState.ammount$;

  public quotationInfo = this._formBuilder.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    studentName: ['', [Validators.required, Validators.minLength(3)]],
    date: [this.getCurrentDate(), Validators.required],
    schoolGrade: ['', [Validators.required, Validators.min(1)]],
    schoolName: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor() {
    this.subscribeToSearchChanges();
    this.getSchoolGrades();
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
    });
  }

  private getCurrentDate(): string {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = currentDate.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  private subscribeToSearchChanges(): void {
    this._subscriptions.add(
      this.searchControl.valueChanges
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe(async (value) => {
          if (value) {
            const products = await this.searchProduct(value);
            this.filteredProducts = products;
          }
        }),
    );
  }

  private async getSchoolGrades(): Promise<void> {
    try {
      const grades = await this._schoolGradeService.getSchoolGrades();
      this.schoolGrades = grades;
    } catch (err) {
      console.error(err);
    }
  }

  public async searchProduct(query: string): Promise<Product[]> {
    const querySanitized = query.toLowerCase().trim();
    let { data: products, error } = await this._supabase
      .from('products')
      .select('*')
      .ilike('name', `%${querySanitized}%`)
      .range(0, 7);

    return (
      products?.map((item) => ({
        id: item.id,
        name: item.name,
        barcode: item.barcode,
        inStock: item.in_stock,
        isActive: item.is_active,
        sellingPrice: item.selling_price,
      })) || []
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
}
