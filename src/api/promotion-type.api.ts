import { PromotionType } from '@app/quotes/models/promotion-type';
import { SUPABASE_CLIENT } from './constants';
import { DbTables } from '@app/common';
import { Observable, from, map } from 'rxjs';

function getPromotionTypeById(promoId: number): Observable<PromotionType> {
  return from(
    SUPABASE_CLIENT.from(DbTables.PROMOTION_TYPE).select('*').eq('id', promoId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as PromotionType;
    }),
  );
}

export const API = {
  getPromotionTypeById,
};
