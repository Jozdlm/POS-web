import { Injectable, inject } from '@angular/core';
import { DbTables } from '@app/common';
import { Observable, map } from 'rxjs';
import { PromotionType } from '../models/promotion-type';
import { DbContext } from '@api/db-context.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionTypeService {
  private readonly _dbContext = inject(DbContext);

  public getPromotionById(promoId: number): Observable<PromotionType> {
    return this._dbContext
      .find<PromotionType>(DbTables.PROMOTION_TYPE, 'id', promoId)
      .pipe(
        map(({ data, error }) => {
          if (error) throw new Error(error.message);

          return data[0] as PromotionType;
        }),
      );
  }
}
