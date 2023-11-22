import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { SchoolGradeService } from '../../services/school-grade.service';
import { SchoolGrade } from '../../models/school-grades';
import { QuotationStateService } from '../../services/quotation-state.service';

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
  private readonly _supabase = this._supabaseService.supabase;
  private _subscriptions = new Subscription();
  public searchControl = new FormControl('');
  // TODO: Add typo to array type
  public filteredProducts: any[] = [];
  public schoolGrades: SchoolGrade[] = [];
  public quotationItems$ = this._quotationState.items$;

  // TODO: Establecer la fecha por defecto de la cotización el día de hoy

  // TODO: Create a control group for quotations

  constructor() {
    this.subscribeToSearchChanges();
    this.getSchoolGrades();
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
    });
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

  // TODO: Add typo to return type
  public async searchProduct(query: string): Promise<any[]> {
    const querySanitized = query.toLowerCase().trim();
    let { data: products, error } = await this._supabase
      .from('products')
      .select('*')
      .ilike('name', `%${querySanitized}%`)
      .range(0, 7);

    return products || [];
  }

  // TODO: Add typo to parameter type
  public addItemToQuotation(item: any): void {
    this._quotationState.addItem({
      // TODO: Create a object that match with the type
      ...item,
      description: item.name,
      quantity: 1,
      ammount: 1
    });
  }
}
