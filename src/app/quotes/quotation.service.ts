import { Injectable } from '@angular/core';
import {
  Quotation,
  QuotationDto,
  QuoteMutation,
  QuoteWithRefTables,
} from './quotation';
import { QuotationItem, QuotationItemDto } from './quotation-item';
import { QuoteMapper, QuoteItemMapper } from './quote.mapper';
import { Observable, map, switchMap } from 'rxjs';
import { API } from '@api/index';
import { createQuote, createQuoteItems } from '@api/quotes.api';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  public getQuotationItems(quotationId: number): Observable<QuotationItem[]> {
    return API.getQuoteItems<QuotationItemDto[]>(quotationId).pipe(
      map((response) => {
        return response.map((itemDto) => QuoteItemMapper.toEntity(itemDto));
      }),
    );
  }

  public getQuotations(): Observable<Quotation[]> {
    return API.getQuotes<QuoteWithRefTables[]>().pipe(
      map((response) => {
        return response.map((item) => QuoteMapper.toEntity(item));
      }),
    );
  }

  public getQuotationById(quotationId: number): Observable<Quotation | null> {
    return API.getQuoteById<QuoteWithRefTables | null>(quotationId).pipe(
      map((response) => {
        if (!response) return null;
        return QuoteMapper.toEntity(response);
      }),
    );
  }

  public createQuoteWithItems(metadata: QuoteMutation, items: QuotationItem[]) {
    const quotationDto: QuotationDto = QuoteMapper.toDto(metadata);

    return createQuote<QuotationDto, QuotationDto>(quotationDto).pipe(
      switchMap((insertedRow) => {
        if (!insertedRow.id)
          throw new Error(
            'An error has retrieve it, when tried to create a quote',
          );

        const headerId = insertedRow.id;

        const quoteItems: QuotationItemDto[] = items.map((item) =>
          QuoteItemMapper.toDto(item, headerId),
        );

        return createQuoteItems(quoteItems);
      }),
    );
  }
}
