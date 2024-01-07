import { Injectable, inject } from '@angular/core';
import { DbTables, SupabaseService } from '@app/common';
import { Observable, from, map } from 'rxjs';
import { PromotionType } from '../models/promotion-type';

@Injectable({
  providedIn: 'root',
})
export class PromotionTypeService {
  private readonly _db = inject(SupabaseService).supabase;

  public getPromotionById(promoId: number): Observable<PromotionType> {
    return from(
      this._db.from(DbTables.PROMOTION_TYPE).select().eq('id', promoId),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return data[0] as PromotionType;
      }),
    );
  }
}
