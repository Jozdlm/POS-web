import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SupabaseService } from 'src/app/core/services/supabase.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.scss',
})
export class AddQuotationComponent {
  private readonly _supabaseService = inject(SupabaseService);
  private readonly _supabase = this._supabaseService.supabase;
  public searchControl = new FormControl('');
  // TODO: Add typo to array type
  public filteredProducts: any[] = [];

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(async (value) => {
        if (value) {
          const products = await this.searchProduct(value);
          this.filteredProducts = products;
        }
      });
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
}
