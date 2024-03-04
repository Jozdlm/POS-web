import { Injectable } from '@angular/core';
import {
  Quotation,
  QuotationDto,
  QuoteMutation,
  QuoteWithRefTables,
} from '../models/quotation';
import { QuotationItem, QuotationItemDto } from '../models/quotation-item';
import { QuotationMapper } from '../quotation.mapper';
import { QuotationItemMapper } from '../quotation-item.mapper';
import { DbTables } from '@api/db-tables.enum';
import { Observable, from, map } from 'rxjs';
import { SUPABASE_CLIENT } from '@api/constants';
import { API } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly _db = SUPABASE_CLIENT;

  constructor() {}

  private async _insertHeader(header: QuotationDto): Promise<any> {
    const { data, error } = await this._db
      .from(DbTables.QUOTATIONS)
      .insert(header)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }

  private async _insertItems(items: QuotationItemDto[]): Promise<void> {
    const { error } = await this._db
      .from(DbTables.QUOTATION_ITEMS)
      .insert(items);

    if (error) {
      throw new Error(error.message);
    }
  }

  public async createQuotation(
    quotation: QuoteMutation,
    items: QuotationItem[],
  ): Promise<void> {
    const quotationDto: QuotationDto = QuotationMapper.toDto(quotation);

    const insertedHeader = await this._insertHeader(quotationDto);
    const quotationId: number = insertedHeader.id;

    const quotationItems: QuotationItemDto[] = items.map((item) =>
      QuotationItemMapper.toDto(item, quotationId),
    );

    await this._insertItems(quotationItems);
  }

  public getQuotationItems(quotationId: number): Observable<QuotationItem[]> {
    return from(
      this._db
        .from(DbTables.QUOTATION_ITEMS)
        .select(`*, ${DbTables.PRODUCTS}(name)`)
        .eq('quotation_id', quotationId),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return data.map((itemDto) => QuotationItemMapper.toEntity(itemDto));
      }),
    );
  }

  public getQuotations(): Observable<Quotation[]> {
    return API.getQuotes<QuoteWithRefTables[]>().pipe(
      map((response) => {
        return response.map((item) => QuotationMapper.toEntity(item));
      }),
    );
  }

  public getQuotationById(quotationId: number): Observable<Quotation | null> {
    return from(
      this._db
        .from(DbTables.QUOTATIONS)
        .select(
          `*, ${DbTables.SCHOOL_GRADES}(name), ${DbTables.SCHOOLS}(name), ${DbTables.PROMOTION_TYPE}(description)`,
        )
        .eq('id', quotationId),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return QuotationMapper.toEntity(data[0] as QuoteWithRefTables);
      }),
    );
  }
}
