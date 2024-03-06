import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PromotionType } from './promotion-type';
import { API } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class PromotionTypeService {
  public getPromotionById(promoId: number): Observable<PromotionType> {
    return API.getPromotionTypeById<PromotionType>(promoId);
  }
}
